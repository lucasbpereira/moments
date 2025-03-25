import { View, FlatList } from 'react-native';
import styles from './styles';
import { Header } from '@/components/header';
import { Navbar } from '@/components/navbar';
import {PhotoComponent, Timeline} from '@/components/timeline';

export default function Events() {

    

    // const photoList =  [{
    //         id: '1',
    //         url: 'https://images.pexels.com/photos/247937/pexels-photo-247937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         alt: 'teste',
    //         title: 'É tão fofinho',
    //         likes: 5,
    //         comments: 5,
    //         author: {
    //             id:    '123',
    //             username:  'Lucas Barbosa',
    //             verified:  true,
    //             profile_image: 'teste',
    //         },
    //     },
    //     {
    //         id: '2',
    //         url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         alt: 'teste',
    //         title: 'Dá vontade de apertar',
    //         likes: 5,
    //         comments: 5,
    //         author: {
    //             id:    '123',
    //             username:  'Karina Vieira',
    //             verified:  true,
    //             profile_image: 'teste',
    //         },
    //     }]
    
    
    // // setPhotos(photoList)

    // return (
    //     <View style={styles.container}>
    //         <Header  admin={false}  />
    //         <View style={styles.content}>  
    //             <FlatList 
    //                 data={photoList}
    //                 keyExtractor={(item:PhotoComponent) => item.id}
    //                 renderItem={({ item }) => (
    //                     <Timeline 
    //                     id={item.id}
    //                     url={item.url}
    //                     alt={item.alt}
    //                     title={item.title}
    //                     likes={item.likes}
    //                     comments={item.comments}
    //                     author={item.author}
    //                     />
    //                 )}
    //             />
    //         </View>
    //         <Navbar></Navbar>
    //     </View>
    // )    
}