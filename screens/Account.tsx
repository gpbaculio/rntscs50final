import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {AuthContext} from '../components/Root';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Account = () => {
  const {user, signOut} = useContext(AuthContext);
  if (user) {
    return (
      <View style={styles.container}>
        <View style={styles.upperInfoContainer}>
          <Image style={styles.avatar} source={{uri: user.avatar}} />
          <Text style={styles.userName}>{user.name}</Text>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.infoContainer}>
            <MaterialIcons
              style={styles.infoIcon}
              name={'email'}
              size={30}
              color={'#2F77BF'}
            />
            <Text>{user!.email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <MaterialIcons
              style={styles.infoIcon}
              name={'local-phone'}
              size={30}
              color={'#2F77BF'}
            />
            <Text>{user.phone}</Text>
          </View>
          <View style={styles.infoContainer}>
            <MaterialIcons
              style={styles.infoIcon}
              name={'location-on'}
              size={30}
              color={'#2F77BF'}
            />
            <Text>{user.address}</Text>
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
  } else {
    return null;
  }
};

export default Account;

const styles = StyleSheet.create({
  infoContainer: {flexDirection: 'row', alignItems: 'center', marginBottom: 14},
  infoIcon: {marginRight: 10},
  upperInfoContainer: {
    backgroundColor: '#2F77BF',
    padding: 16,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userName: {color: '#FFF', marginTop: 12, fontSize: 16},
  avatar: {width: 120, height: 120, borderRadius: 100},
  container: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  profileContainer: {
    padding: 14,
    backgroundColor: '#FFF',
  },
  dataContainer: {
    width: '100%',
    alignItems: 'flex-start',
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
