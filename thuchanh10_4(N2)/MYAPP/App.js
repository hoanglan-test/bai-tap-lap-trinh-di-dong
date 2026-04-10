import React, { useEffect } from 'react';
import { 
  View, Text, StyleSheet, Image, ImageBackground, 
  TextInput, TouchableOpacity, SafeAreaView, ScrollView 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// --- 1. Splash ---
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.center, { backgroundColor: '#53B175' }]}>
      <Image 
        source={require("./assets/Group 1.png")} 
        style={{ width: 200, height: 50 }} 
      />
    </View>
  );
};

// --- 2. Onboarding ---
const OnboardingScreen = ({ navigation }) => (
  <ImageBackground 
    source={require("./assets/background.png")} 
    style={{ flex: 1, width: '100%', height: '100%' }}
    resizeMode="cover"
  >
    <View style={styles.overlay1}>
      <Image 
        source={require("./assets/Group 2.png")} 
        style={styles.logo} 
      />
      <Text style={styles.titleWhite}>Welcome{"\n"}to our store</Text>
      <Text style={styles.subtitleWhite}>
        Get your groceries in as fast as one hour
      </Text>

      <TouchableOpacity 
        style={styles.buttonGreen1} 
        onPress={() => navigation.navigate('SignInMain')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

// --- 3. SignIn Main ---
const SignInMainScreen = ({ navigation }) => (
  <SafeAreaView style={styles.containerWhite}>
    <Image 
      source={require("./assets/Mask Group.png")} 
      style={{ width: '100%', height: 250 }} 
    />

    <View style={{ padding: 25 }}>
      <Text style={styles.headerText}>
        Get your groceries{"\n"}with nectar
      </Text>

      <TouchableOpacity 
        style={styles.inputBox} 
        onPress={() => navigation.navigate('NumberInput')}
      >
        <Text>🇻🇳 +84</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>
        Or connect with social media
      </Text>

      <Image 
      source={require("./assets/google.png")} 
      style={{ width: '100%', height: 60 }} 
      />

      <Image 
      source={require("./assets/facebook.png")} 
      style={{ width: '100%', height: 60, marginTop: 15 }} 
      />


      
    </View>
  </SafeAreaView>
);

// --- 4. Nhập số ---
const NumberInputScreen = ({ navigation }) => (
  <SafeAreaView style={styles.containerWhite}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>←</Text>
    </TouchableOpacity>

    <View style={{ padding: 25 }}>
      <Text style={styles.headerText}>Enter your mobile number</Text>

      <Text style={styles.label}>Mobile Number</Text>
      <TextInput 
        style={styles.inputBorder} 
        keyboardType="phone-pad" 
        placeholder="+84" 
      />

      <TouchableOpacity 
        style={styles.nextBtn} 
        onPress={() => navigation.navigate('Verification')}
      >
        <Text style={styles.buttonText}>→</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

// --- 5. OTP ---
const VerificationScreen = ({ navigation }) => (
  <SafeAreaView style={styles.containerWhite}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>←</Text>
    </TouchableOpacity>

    <View style={{ padding: 25 }}>
      <Text style={styles.headerText}>Enter your 4-digit code</Text>

      <Text style={styles.label}>Code</Text>
      <TextInput 
        style={styles.inputBorder} 
        keyboardType="number-pad" 
        maxLength={4} 
        placeholder="- - - -" 
      />

    <View style={styles.rowBottom}>
      <Text style={{ color: '#53B175', marginTop: 20 }}>
        Resend Code
      </Text>

      <TouchableOpacity 
        style={styles.nextBtn} 
        onPress={() => navigation.navigate('Location')}
      >
        <Text style={styles.buttonText}>→</Text>
      </TouchableOpacity>
      
    </View>
      
    </View>
  </SafeAreaView>
);

// --- 6. Location ---
const LocationScreen = ({ navigation }) => (
  <SafeAreaView style={styles.containerWhite}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>←</Text>
    </TouchableOpacity>
    <View style={{ padding: 25, alignItems: 'center' }}>
      <Image 
        source={ require("./assets/illustration.png") } 
        style={{ width: 120, height: 120 }} 
      />

      <Text style={styles.headerText}>Select Your Location</Text>

      <Text style={styles.descText}>
        Switch on your location to stay in tune with what’s happening in your area
      </Text>

      <View style={{ width: '100%', marginTop: 30 }}>
        <Text style={styles.label}>Your Zone</Text>
        <TextInput style={styles.inputBorder} placeholder="Ha Noi" />

        <Text style={[styles.label, { marginTop: 20 }]}>Your Area</Text>
        <TextInput style={styles.inputBorder} placeholder="Hoan Kiem" />
      </View>

      <TouchableOpacity 
        style={[styles.buttonGreen, { width: '100%', marginTop: 40 }]} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

// --- 7. Login ---
const LoginScreen = ({ navigation }) => (
  <SafeAreaView style={styles.containerWhite}>
    <ScrollView style={{ padding: 25 }}>
      <Image 
        source={require("./assets/Group.png")} 
        style={{ alignSelf: 'center', marginVertical: 40, width: 50, height: 60 }} 
      />

      <Text style={styles.headerText}>Login</Text>
      <Text style={styles.subtitle}>Enter your email and password</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.inputBorder} placeholder="hoanglan@gmail.com" />

      <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>
      <TextInput style={styles.inputBorder} secureTextEntry placeholder="******" />

      <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 10 }}>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonGreen, { marginTop: 30 }]}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.rowCenter}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ color: '#53B175', fontWeight: 'bold' }}>Signup</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
);

// --- 8. SignUp ---
const SignUpScreen = ({ navigation }) => (
  <SafeAreaView style={styles.containerWhite}>
    <ScrollView style={{ padding: 25 }}>
      <Image 
        source={require("./assets/Group.png")} 
        style={{ alignSelf: 'center', marginVertical: 40, width: 50, height: 60 }} 
      />
      <Text style={styles.headerText}>Sign Up</Text>

      <Text style={styles.label}>Username</Text>
     <TextInput style={styles.inputBorder} placeholder="Hoàng Lan" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.inputBorder} placeholder="hoanglan@gmail.com" />

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.inputBorder} secureTextEntry placeholder="******" />

      <View style={styles.rowCenter1}>
        <Text>By continuing you agree to our </Text>
        <Text  style={{ color: '#53B175' }}>Terms of Service </Text>
        <Text>and </Text>
        <Text  style={{ color: '#53B175' }}>privacy Policy.</Text>
       </View>

      <TouchableOpacity style={[styles.buttonGreen, { marginTop: 30 }]}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.rowCenter}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: '#53B175' }}>Signup</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
);

// --- App ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignInMain" component={SignInMainScreen} />
        <Stack.Screen name="NumberInput" component={NumberInputScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- STYLE ---
const styles = StyleSheet.create({
  container: { flex: 1 },
  containerWhite: { flex: 1, backgroundColor: '#FFF' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    
 
  },

  overlay1: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingBottom: 60,
  paddingHorizontal: 30
},

logo: {
  width: 50,
  height: 60,
  marginBottom: 20   // 👉 khoảng cách xuống title
},

titleWhite: {
  color: '#FFF',
  fontSize: 36,
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: 42,     // 👉 giúp xuống dòng đẹp hơn
},

subtitleWhite: {
  color: '#FFF',
  fontSize: 16,
  textAlign: 'center',
  marginTop: 10,
  marginBottom: 30,   // 👉 khoảng cách tới button
  opacity: 0.8
},

buttonGreen1: {
  width: '100%',
  height: 60,
  backgroundColor: '#53B175',
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center'
},

  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 10
  },

  subtitle: { color: '#7C7C7C', marginBottom: 20 },

  label: { color: '#7C7C7C', marginTop: 10 },

  inputBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 10,
    fontSize: 16
  },

  inputBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 15,
    marginTop: 20
  },

  buttonGreen: {
    width: '100%',      // 👉 full ngang
    height: 60,         // 👉 chiều cao
    backgroundColor: '#53B175',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },

  socialBtn: {
    paddingVertical: 18,
    borderRadius: 19,
    alignItems: 'center'
  },

  nextBtn: {
    backgroundColor: '#53B175',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 40
  },

  rowCenter1: {
    flexDirection: 'row',
    marginTop: 25
  },

  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25
  },


  orText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#7C7C7C'
  },

  descText: {
    textAlign: 'center',
    color: '#7C7C7C',
    marginTop: 10
  },

  rowBottom: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 20
},
});