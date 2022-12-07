import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { requestUserPermission, notificationListener } from './Notification/notificationService'
import PushNotification from "react-native-push-notification";

const App = () => {
  useEffect(()=>{
    requestUserPermission()
    notificationListener()
    createChannels()
  },[])
 
  const createChannels = () =>{
    PushNotification.createChannel({
      channelId: 'channel-id',
      channelName: 'channel-name'
    })
  }

  const handleLocalNotification = () => {

    // Local Notification i miss the id but it is use and it must be unique now check we click the new local
    // notification is come by using id if the id is already create then he cannot create the new notification 
    PushNotification.localNotification({
      title: 'Local Push Notification',
      message: 'You did That Boy',
      channelId: 'channel-id'
    })
  }
  const handleLocalNotificationSchedule = () => {

    // Local Notification Schedule trigger after 20 second expect app is runing in idle Mode
    PushNotification.localNotificationSchedule({
      title: 'Local Notification Schedule',
      message: 'Local Notification after 20 seconds',
      channelId: 'channel-id',
      date: new Date(Date.now() + 20 * 1000),
      allowWhileIdle: true
    })

  }
  const handleCancelAllLocalNotifications = () => {

    // cancel all Local Notification 
    // by giving the id we just clear the specific notification too
    PushNotification.cancelAllLocalNotifications()
  }

  return (
    <View
     style={{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
     }}
    >
        <TouchableOpacity 
         onPress={()=> {
          handleLocalNotification()
         }}
        >
          <Text style={{fontSize: 20, color: 'red', backgroundColor:'yellow', borderRadius:18, padding:10}} >Local Push Notification</Text> 
          </TouchableOpacity>
          <TouchableOpacity 
         onPress={()=> {
          handleLocalNotificationSchedule()
         }}
        >
          <Text style={{fontSize: 20, color: 'red', backgroundColor:'white', borderRadius:18, padding:10, marginTop:12}} >Local Schedule Push Notification</Text> 
          </TouchableOpacity>
          <TouchableOpacity 
         onPress={()=> {
          handleCancelAllLocalNotifications()
         }}
        >
          <Text style={{fontSize: 20, color: 'red', backgroundColor:'blue', borderRadius:18, padding:10, marginTop:12}} >Local Cancel All Push Notification</Text> 
          </TouchableOpacity>
    </View>
  )
}

export default App