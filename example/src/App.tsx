import * as React from 'react';

import { StyleSheet, View, Text, Platform, Button } from 'react-native';
import VbtCirrusmdBridgeLibrary from 'react-native-vbt-cirrusmd-bridge-library';


var sdkid = "d2f0aa92-3da9-450c-9ba2-854e36a2e277"
var patientid = 63
var secret = "eyJzaGFyZWRfc2VjcmV0IjoiOTg0MDMyNDYtMGJmMS00ZjNjLWFhMTktMDg1ZWFiMGMxMWE2IiwieDUwOV9jZXJ0X2RlciI6Ik1JSUQ4RENDQXRpZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREJjTVFzd0NRWURWUVFHRXdKVlV6RVdNQlFHQTFVRUNnd05RMmx5Y25WelRVUWdTVzVqTGpFVU1CSUdBMVVFQ3d3TFJXNW5hVzVsWlhKcGJtY3hEREFLQmdOVkJBTU1BMU5FU3pFUk1BOEdBMVVFQ0F3SVEyOXNiM0poWkc4d0lCY05OekF3TVRBeE1EQXdNREF3V2hnUE5EQXdNVEF4TURFd01EQXdNREJhTUZ3eEN6QUpCZ05WQkFZVEFsVlRNUll3RkFZRFZRUUtEQTFEYVhKeWRYTk5SQ0JKYm1NdU1SUXdFZ1lEVlFRTERBdEZibWRwYm1WbGNtbHVaekVNTUFvR0ExVUVBd3dEVTBSTE1SRXdEd1lEVlFRSURBaERiMnh2Y21Ga2J6Q0NBU0l3RFFZSktvWklodmNOQVFFQkJRQURnZ0VQQURDQ0FRb0NnZ0VCQU9QVWphcHBBRTg0NnZLZE9jN1VJR0xyK3RPMzBRMy9qVTdIU0FZbFNoZCtCV290bGw4RkkvVkZoc0RXcTBFRk9VUGRvMFQvSmVOcnRuYmVYYXllUlYzSFlRNU9admxkUlZhcUNPYmRmRmFhZWpDM2JVVW5zRFdWalJqTlExZTNicVFkYk9ELzZNZTd3cTI0NFExVTdkY2ZWL3lIVlgzMEtBOUxZZSthcmhWbld4TWFrWW1LbWZ1S1Vrby8vQm5tRDZiQkpJR3hGRzJTOXEwR3ZVODJ4RHViQitDbkpzczJ3QlFpWGE3VW8rM0E3NU5VNlgrcXUySlRQYnBMSkgyZ01oYUZ3MGwzOTN6T0ZuWldGWUx3dlhrTmd0bkYzVFIySk52ZWpseFBYQ0NKN0hrZVpuZVJUdXF2RFN0cGpWK2t2WDg2cUZIZWdMSE5ZTU5rK1pONm1CTUNBd0VBQWFPQnVqQ0J0ekFQQmdOVkhSTUJBZjhFQlRBREFRSC9NQjBHQTFVZERnUVdCQlJpTVBnbTF6SCtLamZpMlpGc3dqaEV3akZncHpDQmhBWURWUjBqQkgwd2U0QVVZakQ0SnRjeC9pbzM0dG1SYk1JNFJNSXhZS2VoWUtSZU1Gd3hDekFKQmdOVkJBWVRBbFZUTVJZd0ZBWURWUVFLREExRGFYSnlkWE5OUkNCSmJtTXVNUlF3RWdZRFZRUUxEQXRGYm1kcGJtVmxjbWx1WnpFTU1Bb0dBMVVFQXd3RFUwUkxNUkV3RHdZRFZRUUlEQWhEYjJ4dmNtRmtiNElCQURBTkJna3Foa2lHOXcwQkFRc0ZBQU9DQVFFQXBYc2owNFBpNmlveXBIMys3cHhIYVM2cmVCVGJva1REUDVlcHM2QTVJamYzSWdsVG93U3IreldYNHJTTldRVVFXZUZqK1Nwa0hmZjVrVjV1bk5GdDk3OE16aXo0SFF0QTdxVzFhVG9mNks5dy93cHh5aGkrS250VzFOYzBjNHA1d1VnWGwvM0Z6YmJIRzJzekpRZEdPaUhTR3YwS3JtU1BJMjhkQ29HOWJUZXIzcG5BTnQ3aHZ6cHJWa3NmbXlkcTB4c1dEek8rSENQSjlIa0tPYXlLUnZZRVMxQXo1TGU2dWtmazRhbWlCc2FEekVmRWE1NzlnMEZXNVRMMFhWZ2xobVluQmxpVTU4d3JjT1hPTXJVQUFFZWVDNzJRQXBIcVBHUkJWNWJnSWV5eWVuUU1PQVJvckgzV2gwY0ZaNjc2WXpOUHUwTlpoTnd5bTJZUWZrNWF3Zz09IiwicHVibGljX2tleV9wZW0iOiItLS0tLUJFR0lOIFBVQkxJQyBLRVktLS0tLVxuTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUE0OVNOcW1rQVR6anE4cDA1enRRZ1xuWXV2NjA3ZlJEZitOVHNkSUJpVktGMzRGYWkyV1h3VWo5VVdHd05hclFRVTVROTJqUlA4bDQydTJkdDVkcko1RlxuWGNkaERrNW0rVjFGVnFvSTV0MThWcHA2TUxkdFJTZXdOWldOR00xRFY3ZHVwQjFzNFAvb3g3dkNyYmpoRFZUdFxuMXg5WC9JZFZmZlFvRDB0aDc1cXVGV2RiRXhxUmlZcVorNHBTU2ovOEdlWVBwc0VrZ2JFVWJaTDJyUWE5VHpiRVxuTzVzSDRLY215emJBRkNKZHJ0U2o3Y0R2azFUcGY2cTdZbE05dWtza2ZhQXlGb1hEU1hmM2ZNNFdkbFlWZ3ZDOVxuZVEyQzJjWGROSFlrMjk2T1hFOWNJSW5zZVI1bWQ1Rk82cThOSzJtTlg2UzlmenFvVWQ2QXNjMWd3MlQ1azNxWVxuRXdJREFRQUJcbi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLVxuIn0="


export default function App() {

  const loginAndRedirect =async () => {
    await VbtCirrusmdBridgeLibrary.loginIos(sdkid, patientid, secret);
    VbtCirrusmdBridgeLibrary.loadIosView()
  }
    const login = () => {
    VbtCirrusmdBridgeLibrary.loginAndroid(sdkid, patientid.toString(), secret);
    }
    const redirect = () => {
    VbtCirrusmdBridgeLibrary.loadAndroidView()
  }

  if (Platform.OS === 'ios') {
    return (
    <View style={styles.container}>
      <Button title="Login and redirect" onPress={ () => loginAndRedirect() }/>
    </View>
  );
  } else {
    return (
    <View style={styles.container}>
        <Button title="Login" onPress={() => login()} />
        <Button title="Redirect" onPress={ () => redirect() }/>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
