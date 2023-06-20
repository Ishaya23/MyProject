    import { useContext,useState } from "react";
    import { AppContext } from "../settings/globalVariables";
    import { View,Text,StyleSheet,Alert } from "react-native";
    import {SafeArea } from "../components/SafeArea";
    import { Button,TextInput } from "react-native-paper";
    import * as yup from 'yup';
    import { Formik } from "formik";
    import { db } from "../settings/firebase.setting";
    import { addDoc,collection } from "firebase/firestore";
    import { UseActivityIndicator } from "../components/ActivityIndicator";


    const validationRules = yup.object({
        title:yup.string().required('required field',),
        desc:yup.string().required('required field',),
        target:yup.number().required('required field',),
    });


    export function Create({navigation}) {
        const {uid} = useContext(AppContext);
        const [modalVisible, setModalVisible] = useState(false);
        
        return uid !== null ? (
            <SafeArea>
                <UseActivityIndicator bool={modalVisible}/>
                <Text style={styles.mainTitle}>create a Fund Raiser</Text>
                <Text style={styles.crimeAlert}>This app is a demonstratiom app built by a cohort 
                of student and instrctor at earlycode. This app must not be used by any means for 
                frudulent purpose. The students and the institutions takes no 
                responsible for any act of crime on the app</Text>
            <Formik
             initialValues={{title:'',desc:'',target:0 }}
            onSubmit={(values,action) =>{
                setModalVisible(true);
            addDoc(collection(db,'project'),{
                title:values.title,
                description:values.desc,
                target:Number(values.target),
                createdBy:uid,
                status:'active',
                createdAt:new Date().getTime()
            }).then(() => {
                setModalVisible(false);
                Alert.alert(
                    'Message',
                    'Fund Raiser Created!!',
                    [
                        {text:'Go to Raisers',onPress:() => navigation.navigate('FundRaiser')},
                        {text:'dismiss',},
                    ]
                )
            })
            .catch(error => {
                setModalVisible(false);
                Alert.alert(
                'message',
                error.message,
                [{text:'Dismiss'}]
                )
            })

            }}
            validationSchema={validationRules}
            >
            {({ handleChange, handleBlur, handleSubmit, values,errors,touched }) => (
                <View>
                <View style={styles.form}>
                    <TextInput
                    outlineColor="gray"
                    activeOutlineColor="#5D9C59"
                    label="Title"
                    mode="outlined"
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                    />
                    {touched.title && errors.title ? 
                    <Text style={{color:'red'}}>{errors.title}</Text>
                    :null}
                </View>

                <View>
                    <TextInput
                    outlineColor="gray"
                    activeOutlineColor="#5D9C59"
                    label="description"
                    mode="outlined"
                    Style={styles.input}
                    onChangeText={handleChange('desc')}
                    onBlur={handleBlur('desc')}
                    value={values.desc}
                    multiline={true}
                    />
                    {touched.desc && errors.desc ? 
                    <Text style={{color:'red'}}>{errors.desc}</Text>
                    :null}
                </View>

                <View>
                    <TextInput
                    outlineColor="gray"
                    activeOutlineColor="#5D9C59"
                    label="Target amount"
                    mode="outlined"
                    Style={styles.input}
                    onChangeText={handleChange('target')}
                    onBlur={handleBlur('target')}
                    value={values.target}
                    keyboardType="number-pad"
                    
                    />
                    {touched.target && errors.target ? 
                    <Text style={{color:'red'}}>{errors.target}</Text>
                    :null}
                </View>

                <View style={styles.button}>
                    <Button
                    buttonColor="gray"
                    textColor="black" 
                    mode="contained"
                    onPress={handleSubmit}
                    contentStyle={{paddingVertical:6}}
                    style={{marginVertical:12}}>
                    Create Fund Raiser
                    </Button>
                </View>
                </View>
            )}
                </Formik>
            </SafeArea>
        )
        :(
            <SafeArea>
                <View style={styles.wrapper}>
                <Text style={styles.subHeader2}>sign in first to create a Fund Raiser</Text>
                <Button mode="contained" 
                contentStyle={{paddingVertical:4}}onPress={() => navigation.navigate('Login')}>go to login</Button>
                </View>
            </SafeArea>
        )
    }
    const styles = StyleSheet.create({
        wrapper:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            gap:16
        },
        subHeader2:{
            fontSize:24,
            textAlign:'center'
            
        },
        mainTitle:{
            fontSize:26,
            marginBottom:6
        },
        crimeAlert:{
            fontSize:12,
            color:'gray',
            marginBottom:8
        }
    })