import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImagePropTypes, LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Audio} from 'expo-av';
import {AntDesign} from '@expo/vector-icons';
import Player from './Player.js';

export default function App() {

  LogBox.ignoreAllLogs(true);

  const [audioIndex,setarAudioIndex] = useState(0);

  const [playing,setPlaying] = useState(false);
  
  const [audio,setarAudio] = useState(null);

  const [musicas,setarMusicas] = useState([

    {
      nome: 'Sweet child of mine',
      artista: 'Guns N Roses',
      playing: false,
      file: require('./musicas/Sweet.mp3')
    },

    {
      nome:' Welcome to the jungle',
      artista: 'Guns N Roses',
      playing: false,
      file: require('./musicas/Welcome.mp3')
    },
    
    {
      nome: ' This Love',
      artista: 'Maroon 5',
      playing: false,
      file: require('./musicas/love.mp3')
    }
  ]);

  const changeMusic = async (id) =>{
      let curFile = null;
      let newMusics = musicas.filter((val,k)=>{
            if(id == k){
                musicas[k].playing = true;
               
                curFile = musicas[k].file;
                setPlaying(true);
                setarAudioIndex(id);
            }
            else{
                musicas[k].playing = false;
            }

            return musicas[k];
      })

      if(audio != null){
          audio.unloadAsync();
      }

      let curAudio = new Audio.Sound();

      try{
          await curAudio.loadAsync(curFile);
          await curAudio.playAsync();
      }catch(error){}

      setarAudio(curAudio);
      setarMusicas(newMusics);

  }

  return (
     <View style={{flex:1}}>
      <ScrollView style={styles.container}>
          <StatusBar hidden />
          <View style={styles.header}>
            <Text style={{textAlign:'center',color:'white',fontSize:25}}>Falkon Music</Text>
          </View>

          <View style={styles.table}>
              <Text style={{width:'50%',color:'rgb(200,200,200)'}}>Música</Text>
              <Text style={{width:'50%',color:'rgb(200,200,200)'}}>Artista</Text>
          </View>


          {
            musicas.map((val,k)=>{
                
                if(val.playing){
                    //Renderiza algo aqui.
                    return(
                    <View style={styles.table}>
                        <TouchableOpacity onPress={()=>changeMusic(k)}  style={{width:'100%',flexDirection:'row'}}>
                            <Text style={styles.tableTextSelected}><AntDesign name="play" size={15} 
                            color="#1DB954" /> {val.nome}</Text>
                            <Text style={styles.tableTextSelected}>{val.artista}</Text>
                        </TouchableOpacity>
                    </View>
                    );
                }else{
                  //Renderiza outra coisa aqui.
                  return(
                    <View style={styles.table}>
                        <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%',flexDirection:'row'}}>
                            <Text style={styles.tableText}><AntDesign name="play" size={15} 
                            color="white" /> {val.nome}</Text>
                            <Text style={styles.tableText}>{val.artista}</Text>
                        </TouchableOpacity>
                    </View>
                    );
                }

            })
          }

          
        <View style={{paddingBottom:200}}></View>
        
      </ScrollView>
      <Player playing={playing}  setPlaying={setPlaying} setarAudioIndex={setarAudioIndex} audioIndex={audioIndex} musicas={musicas}
        setarMusicas={setarMusicas} audio={audio} setarAudio={setarAudio}
      ></Player>
      </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222'
  },
  header:{
    backgroundColor:'#1DB954',
    width:'100%',
    padding:20
  },
  table:{
    flexDirection:'row',
    padding:20,
    borderBottomColor:'white',
    borderBottomWidth:1
  },
  tableTextSelected:{width:'50%',color:'#1DB954'},
  tableText:{width:'50%',color:'white'}
});
