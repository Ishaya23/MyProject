import { useState } from "react";
import { StyleSheet,View,ScrollView} from "react-native";
import { SafeArea } from "../components/SafeArea";
import { Button, Card, Text,TextInput } from 'react-native-paper';
import { Theme } from '../utils/theme';
import { db } from '../settings/firebase.setting';
import { getDoc, doc} from "firebase/firestore";
import { Formik } from 'formik';
import * as yup from 'yup';

const validationRules = yup.object({
amount:yup.number().required()
  });

export function FundRaiser ({navigation,route}) {
    const {projectId} = route.params;
    const [fundraiser,setFundRaiser] = useState({});
    const [hideOrShowForm, setHideOrShowForm] = useState(false)

    const handleGetRaiser = async () => {
    const docSnap = await  getDoc(doc(db, 'projects', projectId))
     setFundRaiser(docSnap.data())
    }
    handleGetRaiser()

    return (
        <SafeArea>
            <View style={styles.container}>

            
                    <ScrollView style={styles.card}>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Content style={styles.cardContent}>
                            <Text variant="headlineMedium">{FundRaiser.title}</Text>
                            <Text variant="titleLarge" style={{color:'green',marginVertical:Theme.sizes[3]}}>Target: ₦{FundRaiser.target}</Text>
                            <Text variant="bodyMedium">{FundRaiser.description}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button style={styles.donateBtn}>Dontate</Button>
                        </Card.Actions>
                
                    </ScrollView>
            </View>
            
            <Formik
        initialValues={{ amount: 0, }}
        onSubmit={(values,action) => {}}
        validationSchema={validationRules}
        >
        {({ handleChange, handleBlur, handleSubmit, values,errors,touched }) => (
            <>
                          <View style={styles.inputRow}>
                          <TextInput
                            style={{width:'100%',}}
                            outlineColor={Theme.colors.gray100}
                            activeOutlineColor={Theme.colors.gray200}
                            mode="outlined"
                            label='amount'
                            onChangeText={handleChange('amount')}
                            onBlur={handleBlur('amount')}
                            value={values.email} 
                          />
                          {touched.email && errors.email 
                          ? <Text style={{color:'red'}}>{errors.email}</Text> 
                          : null}
                        </View>
                        <Button
                        buttonColor='green'
                        mode="contained"
                        onPress={handleSubmit}
                        contentStyle={{paddingVertical:6,}}
                        style={{borderRadius:6}}>Sign in</Button>
                        </>

        )}
        </Formik>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    card:{
        marginBottom:Theme.sizes[3],
    }, 
    cardContent:{
        paddingVertical:Theme.sizes[2],
        marginVertical:Theme.sizes[3]
    },

    donateBtn:{
        backgroundColor:Theme.colors.gray400,
        color:Theme.colors.lime400
    },
    inputRow:{
        marginBottom:Theme.sizes[2]
    }
})