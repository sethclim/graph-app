import {createContext, useEffect, useState} from "react";


export const AuthContext = createContext();

const AuthProvider = ({children}) =>{

    const [kineticInstance, setKineticInstance] = useState();

    const [authenticated, setAuthenticated] = useState();
    const [tracking, setTracking] = useState();
    const [profileCode, setProfileCode] = useState();
    const [userName, setUserName] = useState();

    const[transRefId, setTransRefId] = useState();
    const[appRefId, setAppRefId] = useState();
    const[data, setData] = useState();

    const [message, setMessage] = useState();    
    const [getProfileError, setGetProfileError] = useState();
    const [gestureError, setGestureError] = useState();


    var config = {
        scoreThreshold: 80,
        loginThreshold: 80,
        defaultPin: 1111,
        disableChallenge: true
    }

    useEffect(()=>{
        var options = {
            logging: false,
            trackingTimeSensitivity: 10,
            mouseTrackingElement: '#trackarea',
            debug: true,
            autoTracking: false,
            appKey: 'v8fOhFsgdcUnAm8',
            appSecret: 'A9PdBG30C5H4Yebv7GiVYI6P9wplRjYrhgOOQCRoXh9U4JOqVq/1ZfyMDdeQaSwdCQ==',
            trackingInterval: 60,
            sensorPollingFrequency: 10,
            packageId: "graph.app.com",
        }

        const kinetic = new window.ZFS.KineticTracker(options);
	
	    kinetic.init();

        setKineticInstance(kinetic);
    },[])


    const getResults = (x) => {
        var output = {};
    
        if (localStorage.getItem('records')) {
            try {
                output = JSON.parse(localStorage.getItem('records'));
            } catch (e) {
                // Do nothing
            }
        }
    
        localStorage.setItem('records', JSON.stringify(extend(output, x)));
        localStorage.setItem('browserData', JSON.stringify(kineticInstance.getDeviceInfo()));
    
    }
    
    const startTracking = () =>{
        console.log("starting tracking")
        kineticInstance.trackStart();
        setTracking(true);
    }
    
    const stopTracking = async() => {
        await kineticInstance.trackStop(function(trackingData){
            setData(trackingData)
            console.log(trackingData)
            console.log('tracker is stopped')
            localStorage.setItem('records',JSON.stringify(trackingData))
            setTracking(false)
            loginProfile(userName)
        });
        setTracking(false);
    }
    
    /* For creating new profile for the user account with the user name */
    const loginProfile = (userName, text) => {
    
        if (text == null) {
            text = userName
        }
    
        var userData = {
            name: userName,
            uCode: userName
        };
        kineticInstance.getProfile(userData, function (error, profileData) {
            if (error) {
                setGetProfileError(error.data.errors[0].message)
            } else {
                setProfileCode(profileData.data.profileCode)
                setUserName(userName)    
                setAuthenticated(true)
            }
        });
    }
    
    const makeTransaction = () => {
    
        if (profileCode == "" || userName == "") {
            localStorage.removeItem("authToken");
            setAuthenticated(false)

        } else {
            kineticInstance.trackStop(function (trackData) {
                var transRefId = makeTransRefId();
                var body = {
                    gestureInfo: trackData,
                    profileCode: profileCode,
                    transRefId: transRefId
                };
    
                kineticInstance.checkGesture(body, function (error, gestureData) {
                    if (error) {
                        setGestureError(error);
                    } else {
                        setTransRefId(gestureData.refId)
                        setAppRefId(gestureData.data.reqRefId)
    
                        var score = gestureData.data.score;
    
                        // Score greater than thresh. value
                        if (score >= config.scoreThreshold) {
                            reportAction('allow', gestureData, true);
                            setMessage("Your mouse score is good: " + score)
                        } else {
                            // Score less than thres. value
    
                            // Ask for PIN input
                            var getPin = prompt("Your mouse score is not good " + score + "\nPlease enter your PIN", "");
    
                            if (getPin == null || getPin == "") {
                                // PIN cancelled
                                reportAction('deny', gestureData, false);
                            } else {
    
                                // PIN entered
                                if (getPin == config.defaultPin) {
                                    // PIN is correct
                                    reportAction('allow', gestureData, true);
                                } else {
                                    // PIN is wrong
                                    reportAction('deny', gestureData, false);
                                }
                            }
                        }
                    }
                });
            });
        }
    }
    
    const makeTransRefId = () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
    
        for (var i = 0; i < 37; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
    
        return text;
    }
    
    // allowTransaction = true/false whether transaction is error or correct
    const reportAction = (action, checkResp, allowTransaction) => {
        var inputData = {
            profileCode:profileCode,
            action: action,
            refId: checkResp.refId,
            type: checkResp.data.type ? checkResp.data.type : 'gesture'
        };
    
        kineticInstance.reportAction(inputData, function (error, outputData) {
            if (error) {
                console.log(JSON.stringify(error));
            }
    
            console.log('reportAction outputData: ' + JSON.stringify(outputData));
    
    
            // If pin input is true or score > threshold then proceed
            if (allowTransaction) {
    
                // Do below after report action call response
                // var selectedTransactionType = $("#transactionType :selected").text();
                // localStorage.setItem("transType", selectedTransactionType);
                // var amount = $("#amount").val();
                // localStorage.setItem("amount", amount);
    
                if (config.disableChallenge === true) {
    
                    // Challenge disabled. So directly process the transaction.
                    // appRefId = 0
                    // var transRefId = localStorage.getItem("transRefId");
                    // transaction(0, transRefId);
                } else {
                    // Challenge required.
                    window.location.href = "challenge.html";
                }
            } else {
                // Deny
                window.location.href = "transaction-fail.html";
            }
    
        })
    }

    const extend = (props) =>{

            // Variables
            var extended = {};
            var i = 0;
            var length = props.length;
        
            // Merge the object into the extended object
            var merge = function (obj) {
                for ( var prop in obj ) {
                    if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                        extended[prop] = obj[prop];
                    }
                }
            };
        
            // Loop through each object and conduct a merge
            for ( ; i < length; i++ ) {
                var obj = props[i];
                merge(obj);
            }
        
            return extended;
    }

    const value = {
        startTracking,
        stopTracking,
        makeTransaction,
        getResults,
        authenticated,
        tracking,
        message,
        getProfileError,
        gestureError,
        setUserName
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;