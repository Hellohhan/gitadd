/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
    ImageBackground,
    Image
} from 'react-native';
import Myframe from '../../../components/MyFrame/'
import ServiceBackground from '../../../components/ServiceBackground'
import styles from './style';
function MessageList(props) {
    const items = props.items;
    const receiver = props.receiver;
    const listItems = items.map((item, index) => {
        return (
            <View key={index} style={{ flexDirection: 'row' }}>
                <View style={[styles.chatMessage, receiver == item.name ? styles.chatReceiver : null]}>
                    {/* <Text style={styles.chatNameReceiver}>{item.name}</Text> */}
                    <Text style={styles.messageText}>{item.message}</Text>
                    {/* <View style={[styles.chattriangle, receiver == item.name ? styles.Receivertriangle : null]}></View> */}

                </View>
                <View style={[styles.chatHead, receiver == item.name ? styles.ReceiverHead : null]}>
                    <Image
                        style={styles.HeadrPicture}
                        source={require('../Service/image/R-C.png')}
                    >
                    </Image>
                </View>
            </View>
        )
    },
    );
    return (
        <>{listItems}</>
    );
}
const URL_SERVER = 'http://192.168.199.133:8080';
export default function Index() {
    const [items, setItems] = useState([
        // {name: 'girl', message: '我们去吃牛排吧！'},
        // {name: 'boy', message: '今天晚上吃点啥？'},
        // {name: 'girl', message: '我们去吃牛排吧！'},
        // {name: 'boy', message: '好的，我去给小红打气。'},
        // {name: 'boy', message: '你们在门口等我吧。'},
        { name: 'girl', message: '你人呢？我到门口啦', img: '../Service/image/num1.jpg' },
        { name: 'boy', message: '你们在门口等我吧。', img: '../Service/image/R-C.png' },
        { name: 'girl', message: '你人呢？我到门口啦' },
        { name: 'boy', message: '你们在门口等我吧。' },
        { name: 'girl', message: '你人呢？我到门口啦' },
        { name: 'boy', message: '你们在门口等我吧。' },
        { name: 'girl', message: '你人呢？我到门口啦' },
        { name: 'girl', message: '你人呢？我到门口啦' },
        { name: 'boy', message: '你们在门口等我吧。' },
        { name: 'girl', message: '你人呢？我到门口啦' },
        { name: 'boy', message: '你们在门口等我吧。' },
        { name: 'boy', message: '你们在门口等我吧撒大大撒旦阿三' },
        { name: 'girl', message: '你人呢？我到门口啦' },
        { name: 'boy', message: '你们在门口等我吧撒大大撒旦阿三' },
        { name: 'girl', message: '你人呢？我到门口啦' }
    ]);
    const [receiver, setReceiver] = useState('boy');
    const [value, onChangeText] = React.useState('');
    let timer;  //计时器
    useEffect(() => {
        // loadMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /**
     * 加载聊天信息
     */
    const loadMessage = () => {
        timer = setInterval(function () {
            //执行代码
            console.log('-----------获取数据------------');
            fetch(URL_SERVER + '/list')
                .then(function (response) {
                    return response.json();
                })
                .then(function (result) {
                    if (result.code == 0) {
                        setItems(result.data);
                    }
                });
        }, 1000);
    };

    const postMessage = () => {
        fetch(URL_SERVER + '/send', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'roomId=1&message=' + value + '&name=' + receiver,
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Network response was not ok.');
            })
            .then(responseText => {
                console.log(responseText);
            })
            .catch(e => {
                console.log(e.toString());
            });
    };

    //发送消息
    const sendMessage = (message) => {
        let newItems = JSON.parse(JSON.stringify(items));
        newItems.push({ name: receiver, message: message });
        setItems(newItems);
    };
    const sendDo = () => {
        sendMessage(value);
        //postMessage();
        onChangeText('');
    };
    return (
        <>
            <ImageBackground source={require('../../../components/MyFrame/images/bgImg.png')} style={styles.wraper}>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={styles.mainContent}>
                    {/* <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={text => setReceiver(text)}
                    placeholder={'聊天人姓名'}
                    value={receiver}
                    onSubmitEditing={sendDo}
                /> */}

                    {/*背景  */}
                    <View style={styles.background}></View>
                    <View style={styles.chatBody}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <MessageList items={items} receiver={receiver} />
                        </ScrollView>






                    </View>



                




                </SafeAreaView>

                
                <View style={styles.footer}>
                    <TouchableOpacity>
                        <Image style={styles.footerIcon} source={require('../Service/image/语音.png')}></Image>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.keybord}
                        onChangeText={text => onChangeText(text)}
                        // placeholder={'开始聊天吧'}
                        value={value}
                        onSubmitEditing={sendDo}
                        multiline={true} numberOfLines={4}
                        maxLength={20}
                    />
                    <TouchableOpacity>
                        <Image style={styles.footerIcon} source={require('../Service/image/表情.png')}></Image>
                    </TouchableOpacity>
                    {value?
                     <Button
                     onPress={sendDo}
                     title="发送"
                     color="#841584"
                 />:
                        <TouchableOpacity>
                            <Image style={styles.footerIcon} source={require('../Service/image/更多.png')}></Image>
                        </TouchableOpacity> 
                    }
                </View>
               
            </ImageBackground>

        </>
    );
};
