import { View, FlatList, Alert, Text, SafeAreaView, ScrollView, Image, TextInput, Pressable, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Header } from '@/components/header';
import { Navbar } from '@/components/navbar';
import {PhotoComponent, Timeline} from '@/components/timeline';
import api from '@/src/services/api';
import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { EventData } from '@/src/@types/event';
import Input from '@/components/input';
import { EventProps } from '@/src/context/EventFormContext';
import { useForm } from 'react-hook-form';
import { globalStyles } from '@/src/styles';
import { ArrowRightCircle } from 'iconoir-react-native';
import { useEventForm } from '@/src/hooks/useEventForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from '@/components/datePicker';

export default function Create() {
    const router = useRouter();
    const { control, handleSubmit, formState: {errors}, getValues } = useForm<EventProps>();
    const { updateFormData } = useEventForm();
    const { eventFormData } = useEventForm();

    const titleRef = useRef<TextInput>(null);
    const descriptionRef = useRef<TextInput>(null);
    const locationRef = useRef<TextInput>(null);
    const eventDateRef = useRef<any>(null);
    const eventTimeRef = useRef<any>(null);
    const minParticipantsRef = useRef<TextInput>(null);
    const maxParticipantsRef = useRef<TextInput>(null);

    function handleCreateEvent(data: EventProps) {
        console.log(data)
        // updateFormData(data);
        const formattedDate = data.eventDate ? new Date(data.eventDate).toISOString() : "";

        const request = {
            "title": data.title ? data.title : null,
            "description": data.description ? data.description : null,
            "location": data.location ? data.location : null,
            "eventDate": data.eventDate ? formattedDate : null,
            "eventTime": data.eventTime ? data.eventTime.toString() : null,
            "minParticipants": data.minParticipants ? data.minParticipants : null,
            "maxParticipants": data.maxParticipants ? data.maxParticipants : null,
        }
        console.log(request)

        api.post(`/event/create`, request)
        .then(async response => {
            console.log(response)
            router.push('/events');  
        })
        .catch(function (error) {
            if (error.response) {
                // O servidor respondeu com um código de status fora do intervalo 2xx
                console.error('Erro de registro:', JSON.stringify(error));
                // Exibe a mensagem de erro usando Alert.alert
                Alert.alert(
                'Erro',
                error.response.data.message,
                [{ text: 'OK' }] // Adicione um botão "OK" para fechar o alerta
                );
                return error.response.data; // Retorna os dados do erro, se necessário.
            } else if (error.request) {
                // A requisição foi feita, mas nenhuma resposta foi recebida
                console.error('Erro de rede:', error.request);
                // Exibe um alerta de erro de rede
                Alert.alert('Erro de Rede', 'Verifique sua conexão.', [{ text: 'OK' }]);
                return { message: 'Erro de rede. Verifique sua conexão.' };
            } else {
                // Algum erro aconteceu ao configurar a requisição
                console.error('Erro de requisição:', error.message);
                // Exibe um alerta de erro geral
                Alert.alert('Erro', 'Erro ao processar a requisição.', [{ text: 'OK' }]);
                return { message: 'Erro ao processar a requisição.' };
            }
        });
    };



    return (
        // <SafeAreaView style={{flex: 1}}>
        //     <ScrollView>
                <View style={styles.container}>
                    <Header admin={false} />
                    <View style={styles.content}>
                        <View>
                            <Input
                            ref={titleRef}
                            error={errors.title?.message}
                            formProps={{
                                name: "title", 
                                control,
                                rules: {
                                required: "Título é obrigatório"
                                }
                            }} 
                            inputProps={{
                                placeholder: 'Nome',
                                onSubmitEditing: () => descriptionRef.current?.focus()
                            }}
                            />
                            <Input
                            ref={descriptionRef}
                            error={errors.description?.message}
                            formProps={{
                                name: "description", 
                                control
                            }} 
                            inputProps={{
                                placeholder: 'Descrição',
                                onSubmitEditing: () => locationRef.current?.focus()
                            }}
                            />
                            <Input
                            ref={locationRef}
                            error={errors.location?.message}
                            formProps={{
                                name: "location", 
                                control,
                                rules: {
                                required: "Localização é obrigatório"
                                }
                            }} 
                            inputProps={{
                                placeholder: 'Localização',
                                onSubmitEditing: () => eventDateRef.current?.focus()
                            }}
                            />
                            <DatePicker
                                ref={eventDateRef}
                                error={errors.eventDate?.message}
                                formProps={{
                                    name: "eventDate",
                                    control,
                                    rules: {
                                        required: "Data do Evento é obrigatória",
                                    },
                                }}
                                placeholder="Selecione sua Data do Evento"
                            />
                            
                            <Input
                            ref={eventTimeRef}
                            error={errors.eventTime?.message}
                            formProps={{
                                name: "eventTime", 
                                control,
                                rules: {
                                required: "Hora do Evento é obrigatório"
                                }
                            }} 
                            inputProps={{
                                placeholder: 'Hora do Evento',
                                onSubmitEditing: () => minParticipantsRef.current?.focus()
                            }}
                            />
                            <Input
                            ref={minParticipantsRef}
                            error={errors.minParticipants?.message}
                            formProps={{
                                name: "minParticipants", 
                                control
                            }} 
                            inputProps={{
                                placeholder: 'Quantidade Mínima',
                                onSubmitEditing: () => maxParticipantsRef.current?.focus()
                            }}
                            />
                            <Input
                            ref={maxParticipantsRef}
                            error={errors.maxParticipants?.message}
                            formProps={{
                                name: "maxParticipants", 
                                control,
                                
                            }} 
                            inputProps={{
                                placeholder: 'Quantidade Máxima',
                                onSubmitEditing: () => handleSubmit(handleCreateEvent)(),
                                returnKeyType: "next"
                            }}
                            />
                            
                            <View style={[globalStyles.row, styles.formFooter]}>

                                <Pressable onPress={() => handleSubmit(handleCreateEvent)()} style={globalStyles.button} >
                                    <Text style={globalStyles.textButton}>Próximo</Text>
                                    <ArrowRightCircle color="black" height={32} width={32}  />
                                </Pressable>
                            </View>

                        </View>
                    </View>
                    <Navbar />
                </View>
        //     </ScrollView>
        // </SafeAreaView>
    );
}