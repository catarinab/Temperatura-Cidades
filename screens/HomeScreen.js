import React from 'react';
import { Text, StyleSheet, View, FlatList, StatusBar, TouchableHighlight, Button } from 'react-native';
import { LinearGradient } from 'expo';

export default class App extends React.Component{
  constructor(props){
    super(props);
    var navigation = this.props.navigation;
    this.state ={
      cities: [ //LIsta total de cidades
        {
        name:'London',
        country: "UK"
        },
        {
          name:'Edinburgh',
          country: "UK"
        },
        {
          name:'Texas',
          country:'US'
        },
        {
          name:'Washington',
          country: 'US'
        },
        {
          name:'Paris',
          country: 'France'
        },
        {
          name:'Sidney',
          country: 'Australia'
        },
        {
          name:'Cancun',
          country: 'Mexico'
        },
        {
          name:'Madrid',
          country: 'Spain'
        },
        {
          name:'Berlin',
          country: 'Germany'
        },
        {
          name:'Brussels',
          country: 'Belgium'
        },
        {
          name:'Copenhagen',
          country: 'Denmark'
        },
        {
          name:'Athens',
          country: 'Greece'
        },
        {
          name:'New Delhi',
          country: 'India'
        },
        {
          name:'Dublin',
          country: 'Ireland'
        },
        {
          name:'Rome',
          country: 'Italy'
        },
        {
          name:'Tokyo',
          country: 'Japan'
        },
        {
          name:'Wellington',
          country: 'New Zealand'
        },
        {
          name:'Amsterdam',
          country: 'Netherlands'
        },
        {
          name:'Oslo',
          country: 'Norway'
        },
        {
          name:'Panama City',
          country: 'Panama'
        },
        {
          name:'Lisbon',
          country: 'Portugal'
        },
        {
          name:'Warsaw',
          country: 'Poland'
        },
        {
          name:'Moscow',
          country: 'Russia'
        }
      ],
      list: [], //As cidades que vão aparecer no ecrã
      refresh: true
    };
    this.fetchTemps();
  }
    fetchTemps = () =>{
      var newList =[];
      var list = this.getRandom(this.state.cities, 7);
      for(city in list){//Para cada elemento no array list
        var name = list[city].name;//O nome da cidade
        var country = list[city].country;//O nome do país
        //Agora vamos buscar as informações de cada cidades
        this.FetchCityTemp(name, country, newList);


    }
  }

// Função genérica para ter numeros aleatorios
  getRandom =(arr, n) => {
    var result = new Array(n),//Array com o numero de cidades que queremos (n)
    len = arr.length,//Lenght do array com as cidades totais
    taken = new Array(len);//array com a lenght do array com todas as cidades
    while(n--) { //Até ao n chegar a 0 inclusivé
      var x = Math.floor(Math.random() * len);
      //math.floor: retorna o menor inteiro mais perto do número.
      //Math.random: número random entre 0 e 1
      result[n] = arr[x in taken ? taken[x] : x];
      // o x está em taken? se sim, blabla
      // sintaxe in: prop in object
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  loadNewTemps = () => {
    this.setState({
      list: [],
      refresh:true
    })
    this.fetchTemps();
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



  FetchCityTemp = (city, country, newList) => {
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&appid=5938d63b8017ba76aaa6ecd410e78042&units=metric')
    .then((response) => response.json())
    .then((responseJSON)=>{
      var r = responseJSON.main //A parte main do JSON devolvido pela API
      var obj = responseJSON; //O JSON dado pela API total, caso seja necessário outra informação
      var City ={
        name: obj.name, //O nome dado pela API da cidade
        country: country, //País dado anteriormente
        temp: Math.ceil(r.temp), //Temperatura
        type: obj.weather[0].main, //Se está nublado etc etc
        desc: 'Humidade: '+r.humidity+'%  -  '+this.getTranslation(obj.weather[0].main),
        fav: 'false'
      };
      newList.push(City);//Pomos as cidades na lista
      this.setState({
        list: newList,
        refresh: false
      })
    })
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
    return '🌥️';
  }
  if (type == 'Smoke'){
    return '🌥️';
  }
}


  render(){
    return(
      <View  style={style.container}>
      <StatusBar barStyle="light-content"/>
      <Text style={{width:'100%', paddingTop:40, paddingBottom:15, backgroundColor:'black', color:'white', textAlign:'center', fontWeight: 'bold'}}>☀️ CityWeather</Text>
      <FlatList
      style={{width:'100%'}}
      data={this.state.list}
      refreshing={this.state.refresh}
      onRefresh={this.loadNewTemps}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => (
        <TouchableHighlight
        underlayColor="white"
        onPress={() => alert(item.desc)}>
        <LinearGradient
        colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0)']}
        start={[0,0.5]}>
        <View style={style.row}>
        <Text style={[
          (this.getTempRange(item.temp) == 1) ? style.cold : style.temp,
          (this.getTempRange(item.temp) == 2) ? style.medium : style.temp,
          (this.getTempRange(item.temp) == 3) ? style.hot : style.temp,
          (this.getTempRange(item.temp) == 4) ? style.vhot : style.temp,
          style.temp]}>{this.getEmoji(item.type)} {item.temp}°C</Text>
        <Text style={style.cityName}>{item.name}</Text>
        </View>
        </LinearGradient>
        </TouchableHighlight>
      )}
      />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    backgroundColor: '#fff'
  },
  row: {
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
