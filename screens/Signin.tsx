import React from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {AuthContext} from '../components/Root';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().required('Required'),
});

const Signin = () => {
  const {signIn, loading} = React.useContext(AuthContext);
  return (
    <Formik
      initialValues={{
        email: 'eve.holt@reqres.in',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        if (signIn) {
          signIn(values.email, values.password);
        }
      }}>
      {({values, handleChange, handleSubmit, touched, errors}) => (
        <>
          <View style={styles.alertContainer}>
            <View style={styles.alertMain}>
              <Text style={styles.title}>Mock Authentication demo </Text>
              <Text style={styles.subTitle}>
                Cannot change email, input any password.
              </Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <TextInput
                placeholder="Email"
                value={values.email}
                editable={false}
                onChangeText={handleChange('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorMessage}>{errors.email}</Text>
              )}
              <TextInput
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.errorMessage}>{errors.password}</Text>
              )}
              <Button
                disabled={loading}
                title="Sign in"
                onPress={handleSubmit}
              />
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default Signin;

const styles = StyleSheet.create({
  subTitle: {
    color: '#004085',
    opacity: 0.5,
  },
  alertMain: {
    backgroundColor: '#CCE5FF',
    padding: 14,
    margin: 14,
    flexDirection: 'column',
    alignItems: 'center',
  },
  alertContainer: {
    width: '100%',
    position: 'absolute',
  },
  formContainer: {
    padding: 14,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 16,
    color: '#004085',
  },
  container: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  errorMessage: {fontSize: 10, color: 'red'},
  info: {
    textAlign: 'center',
  },
});
