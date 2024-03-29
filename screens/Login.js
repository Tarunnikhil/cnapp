import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import authService from "../firebase_services/auth";
import userContext from "../context/UserProvider";
import LoadingComponent from "../components/LoadingComponent";

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "your password has to have atleast 8 characters"),
  });

  const { setUserDetails } = useContext(userContext);

  const onLogin = (email, password) => {
    setIsLoading(true);
    authService
      .login({ email, password })
      .then(async (user) => {
        const userdata = await authService.getUserInfo(user.email);
        setUserDetails(userdata);
      })
      .catch((error) => Alert.alert("Invalid email or Password"))
      .finally(() => setIsLoading(false));
  };

  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        width: 400,
        paddingTop: 50,
        backgroundColor: "white",
      }}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <Text
              style={{
                color: "black",
                fontSize: 40,
                fontWeight: "bold",
                marginVertical: 100,
              }}
            >
              cNature
            </Text>
            <View
              style={{
                height: 500,
                width: 350,

                paddingTop: 1,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 13,
                  fontWeight: "bold",
                  marginBottom: 1,
                  marginLeft: 40,
                }}
              >
                Email or username
              </Text>
              <View
                style={[
                  styles.inputfield,
                  {
                    borderColor:
                      values.email.length < 1 ||
                      Validator.validate(values.email)
                        ? "#ccc"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="example@gmail.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoFocus={true}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              <Text
                style={{
                  color: "black",
                  fontSize: 13,
                  fontWeight: "bold",
                  marginBottom: 1,
                  marginLeft: 40,
                }}
              >
                Password
              </Text>
              <View
                style={[
                  styles.inputfield,
                  {
                    borderColor:
                      1 > values.password.length || values.password.length >= 6
                        ? "#ccc"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="********"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  textContentType="password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>
              <TouchableOpacity
                titleSize={20}
                style={[
                  styles.button,
                  {
                    backgroundColor: !isLoading ? "#24ba9f" : "#AEB0AD",
                  },
                ]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingComponent />
                ) : (
                  <Text style={styles.buttontext}>LOG IN</Text>
                )}
              </TouchableOpacity>
              <View style={styles.signupcont}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Signup")}
                >
                  <Text
                    style={{
                      color: "#24ba9f",
                      fontWeight: "bold",
                      textDecorationLine: "underline",
                    }}
                  >
                    {" "}
                    SignUp
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputfield: {
    borderRadius: 25,
    padding: 12,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    borderWidth: 1,
    width: "80%",
    marginLeft: 25,
  },
  signupcont: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 25,
    width: "80%",
    marginLeft: 25,
    marginTop: 15,
  },
  buttontext: {
    fontWeight: "600",
    color: "black",
    fontSize: 20,
  },
});

export default Login;
