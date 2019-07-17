import React from 'react';
import { TextInput, Text, StyleSheet, View, FlatList, StatusBar, TouchableHighlight, Button, Image } from 'react-native';
import { LinearGradient } from 'expo';

export default class App extends React.Component{
  constructor(props){
    super(props);
    var navigation = this.props.navigation;
    this.state ={
      serchInput: '',
      searchResult: 0,
      error: 'Procura por uma cidade!',
      item: {},
      cityState: 0
    };
  }


  searchCity =() => {
    this.FetchCityTemp(this.state.searchInput)
  }

makeFav = () => {
  if(this.state.item.fav == 'false'){
    console.log('mudado para verdadeiro')
    return this.state.item.fav == 'true';

  }
  else{
    console.log('mudado para falso')
    return this.state.item.fav == 'false';

  }
}


  getTranslation = (t) => {
    if (t == 'Clouds'){
      return 'Nuvens';
    }
    if(t == 'Clear'){
      return 'Sol';
    }
    if(t == 'Haze'){
      return 'Nevoeiro';
    }
    if(t == 'Thunderstorm'){
      return 'Trovoada';
    }
    if(t =='Rain'){
      return 'Chuva';
    }
    if(t =='Snow'){
      return 'Neve';
    }
    if(t =='Mist'){
      return 'Nublado';
    }
    if(t == 'Smoke'){
      return 'Esfumado';
    }
    else{
      console.log(t);
      return 't';
    }
  }


  FetchCityTemp = (city) => {

    fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=5938d63b8017ba76aaa6ecd410e78042&units=metric')
    .then((response) => response.json())
    .then((responseJSON)=>{
      var r = responseJSON.main //A parte main do JSON devolvido pela API
      var obj = responseJSON; //O JSON dado pela API total, caso seja necessário outra informação
      var citystate = city;
      if(responseJSON.cod !== 200){//.cod é o codigo que diz se deu erro ou não, 200 é quando não dá erro
        this.setState({
          searchResult: 0,
          error: 'Cidade não encontrada.'
        })
      }
      else{
      var City ={
        name: obj.name, //O nome dado pela API da cidade
        temp: Math.ceil(r.temp), //Temperatura
        type: obj.weather[0].main, //Se está nublado etc etc
        desc: 'Humidade: '+r.humidity+'%  -  '+this.getTranslation(obj.weather[0].main),
        fav: 'false',
      };
      this.setState({
        item: City,
        searchResult: 1
      })
    }
    })
  }

  getTranslation = (t) => {
    if (t == 'Clouds'){
      return 'Nuvens';
    }
    if(t == 'Clear'){
      return 'Sol';
    }
    if(t == 'Haze'){
      return 'Nevoeiro';
    }
    if(t == 'Thunderstorm'){
      return 'Trovoada';
    }
    if(t =='Rain'){
      return 'Chuva';
    }
    if(t =='Snow'){
      return 'Neve';
    }
    if(t =='Mist'){
      return 'Nublado';
    }
    if(t =='Smoke'){
      return 'Esfumado';
    }
    else{
      console.log(t);
      return 't';
    }
  }

getTempRange = (t) => {
  if (t<13){
    return 1;
  }
  if (t >12 && t<20){
    return 2;
  }
  if (t >= 20 && t < 30){
  return 3;
}
  if (t >=30){
    return 4;
  }

}

getEmoji = (type) => {
  if (type == 'Clouds'){
    return '☁️';
  }
  if(type == 'Clear'){
    return '☀️';
  }
  if(type == 'Haze'){
    return '⛅';
  }
  if(type == 'Thunderstorm'){
    return '⛈️';
  }
  if(type =='Rain'){
    return '🌧️';
  }
  if(type =='Snow'){
    return '❄️';
  }
  if(type =='Mist'){
    return '🌥️';
  }
  if(type =='Fog'){
    return '⛅';
  }
}



  render(){
    return(
      <View  style={style.container}>
      <StatusBar barStyle="light-content"/>
      <Text style={{width:'100%', paddingTop:40, paddingBottom:15, backgroundColor:'black', color:'white', textAlign:'center', fontWeight: 'bold'}}>☀️ CityWeather</Text>

      <View style={{alignItems:'center', width:'90%'}}>
      <Text style={{textAlign:'center', lineHeight:20, padding:5, fontSize:16}}>Procura por uma cidade!</Text>
      <TextInput
      onChangeText = {(text) => this.setState({searchInput: text})}
      value={this.state.searchInput}
      style={{width:'80%', padding:15, margin:5, backgroundColor:'black', color:'white'}}
      />
      <TouchableHighlight
      style={{backgroundColor:'grey', padding:20, borderRadius:8}}
      onPress={() => this.searchCity()}
      >
      <Text style={{fontSize:14, color:'white'}}> Procurar! </Text>
      </TouchableHighlight>
      </View>

{this.state.searchResult == 1? (


        <TouchableHighlight
        underlayColor="white"
        onPress={() => alert(this.state.item.desc)}>
        <LinearGradient
        colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0)']}
        start={[0,0.5]}>
        <View style={style.row}>
        <Text style={[
          (this.getTempRange(this.state.item.temp) == 1) ? style.cold : style.temp,
          (this.getTempRange(this.state.item.temp) == 2) ? style.medium : style.temp,
          (this.getTempRange(this.state.item.temp) == 3) ? style.hot : style.temp,
          (this.getTempRange(this.state.item.temp) == 4) ? style.vhot : style.temp,
          style.temp]}>{this.getEmoji(this.state.item.type)} {this.state.item.temp}°C</Text>
        <Text style={style.cityName}>{this.state.item.name}{}</Text>
        <TouchableHighlight
        style={{backgroundColor:'grey', padding:5, borderRadius:8, height:40}}
        onPress={() => this.makeFav(this.state.item.fav)}
        >
        <Text style={{fontSize:14, color:'white'}}> Fav! </Text>
        </TouchableHighlight>
        </View>
        </LinearGradient>
        </TouchableHighlight>

      ) : (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>{this.state.error}</Text>
        </View>
      )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    alignItems:'center',
    justifyContent:'flex-start',
    flex:1,
    backgroundColor: '#fff'
  },
  row: {
    width:350,
    flex:1,
    paddingVertical:25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  cityName: {
    fontSize: 20,
    lineHeight: 40,
    fontFamily: 'Roboto'
  },
  temp: {
    fontSize: 30,
    lineHeight: 40,
    width:130,
    marginRight: 15,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  cold: {
    color: 'blue'
  },
  medium:{
    color: 'green'
  },
  hot:{
    color: 'orange'
  },
  vhot:{
    color:'red'
  }
})
