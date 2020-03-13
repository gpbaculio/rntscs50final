import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {AuthContext} from '../components/Root';

const Account = () => {
  const {user, signOut} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.info}> Account Info </Text>
        <View style={styles.dataContainer}>
          <Text style={styles.data}> {user!.id} </Text>
          <Text style={styles.key}> id </Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.data}> {user!.email} </Text>
          <Text style={styles.key}> email </Text>
        </View>
        <Button
          onPress={() => {
            if (signOut) {
              signOut();
            }
          }}
          title="Logout"
        />
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  info: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  dataContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  data: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '100%',
    textAlign: 'center',
  },
  key: {},
});
