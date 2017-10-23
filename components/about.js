import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, FlatList, ActivityIndicator, ScrollView, Image } from 'react-native';
import { Constants } from 'expo';
import Button from 'react-native-button';

import TopBanner from './topBanner';
import AboutInfo from './aboutInfo'

const width = '72%';
const height = '40%';

export default class About extends Component {

  static navigationOptions = {
  title: 'Match Info',
  headerTintColor: '#FFFFFF',
  headerStyle: {
  backgroundColor: 'rgb(47, 54, 61)',
  borderBottomColor: 'gray',
  borderBottomWidth: 1,
  height: 80,
  },
  headerTitleStyle: {
  fontSize: 18,
  left: 70,
  fontWeight: '300',
  top: 10
  }
  };

  constructor() {
    super();
    this.state = {
      teams: [],
      homeTeamMatches: [],
      awayTeamMatches: []
    }
  }

  componentDidMount = () => {
    let {params} = this.props.navigation.state;
    fetch('https://raw.githubusercontent.com/eriksvedenlund/teamData/master/teams.json')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          teams: response.teams
        });
      });

    fetch(params.homeLink + '/fixtures', {
      headers: {
        'X-Auth-Token': 'cf642110fe7d494e9b8852f4f338f6de'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          homeTeamMatches: response.fixtures
        });
      });

    fetch(params.awayLink + '/fixtures', {
      headers: {
        'X-Auth-Token': 'cf642110fe7d494e9b8852f4f338f6de'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          awayTeamMatches: response.fixtures
        });
      })
  }

  render() {
    let {params} = this.props.navigation.state;
    let navigate = params.navigate;
    let homeTeamMatches = this.state.homeTeamMatches;
    homeTeamMatches = homeTeamMatches.filter((item) => {
      return item.status === "FINISHED" && item._links.competition.href === params.competition;
    });
    homeTeamMatches = homeTeamMatches.slice(-4);
    let homeTeamForm = homeTeamMatches.map((item) => {
      if(item.homeTeamName === params.homeTeamName){
        if(item.result.goalsHomeTeam > item.result.goalsAwayTeam){
          return(
            <Image key={item.matchday} style={styles.img3} source={require('../img/winner.png')} />
          );
        }
        else if(item.result.goalsHomeTeam < item.result.goalsAwayTeam){
          return (
            <Image key={item.matchday} style={styles.img3} source={require('../img/lose.png')} />
          );
        } else {
          return(
            <Image key={item.matchday} style={styles.img3} source={require('../img/draw.png')} />
          );
        }
      }
      else{
        if(item.result.goalsHomeTeam > item.result.goalsAwayTeam){
          return(
            <Image key={item.matchday} style={styles.img3} source={require('../img/lose.png')} />
          );
        }
        else if(item.result.goalsHomeTeam < item.result.goalsAwayTeam){
          return (
            <Image key={item.matchday} style={styles.img3} source={require('../img/winner.png')} />
          );
        } else {
          return(
            <Image key={item.matchday} style={styles.img3} source={require('../img/draw.png')} />
          );
        }
      }
    });
    let awayTeamMatches = this.state.awayTeamMatches;
    awayTeamMatches = awayTeamMatches.filter((item) => {
      return item.status === "FINISHED" && item._links.competition.href === params.competition;
    });
    awayTeamMatches = awayTeamMatches.slice(-4);
    let awayTeamForm = awayTeamMatches.map((item) => {
      if(item.homeTeamName === params.awayTeamName){
        if(item.result.goalsHomeTeam > item.result.goalsAwayTeam){
          return(
            <Image key={item.matchday} style={styles.img3} source={require('../img/winner.png')} />
          );
        }
        else if(item.result.goalsHomeTeam < item.result.goalsAwayTeam){
          return (
            <Image key={item.matchday} style={styles.img3} source={require('../img/lose.png')} />
          );
        } else {
          return(
            <Image key={item.matchday} style={styles.img3} source={require('../img/draw.png')} />
          );
        }
      }
      else{
        if(item.result.goalsHomeTeam > item.result.goalsAwayTeam){
          return(
            <Image key={item.matchday} style={styles.img3} source={require('../img/lose.png')} />
          );
        }
        else if(item.result.goalsHomeTeam < item.result.goalsAwayTeam){
          return (
            <Image key={item.matchday} style={styles.img3} source={require('../img/winner.png')} />
          );
        } else {
          return(
            <Image key={item.matchday} style={styles.img3} source={require('../img/draw.png')} />
          );
        }
      }
    });
    let homeTeamImage = this.state.teams.map((item) => {
      if(params.homeTeamName === item.name){
        return(
          <Image key={item.id} style={styles.img} source={{uri: item.img}} />
        );
      }
    });
    let awayTeamImage = this.state.teams.map((item) => {
      if(params.awayTeamName === item.name){
        return(
          <Image key={item.id} style={styles.img} source={{uri: item.img}} />
        );
      }
    });
    return(
      <View style={styles.background}>
        <View style={styles.upperContainer}>
          <Image
            style={styles.landing}
            source={require('../img/go.jpg')}>
            <View style={styles.info}>
                {homeTeamImage}
                <View style={styles.infoOrder}>
                  <Text style={styles.text1}>THURSDAY</Text>
                  <Text style={styles.text2}>18 MAY 2017</Text>
                  <Text style={styles.text2}>19:00</Text>
                </View>
                {awayTeamImage}
            </View>
          </Image>
          <AboutInfo teams={this.state.teams} params={params} homeTeamForm={homeTeamForm} awayTeamForm={awayTeamForm} navigate={navigate}/>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgb(47, 54, 61);"
  },
  landing: {
    height: 220
  },
  upperContainer: {
    flex: 1,
    height: 220,
  },
  img: {
    width: 70,
    height: 70
  },
  info: {
    width,
    height,
    top: 70,
    flexDirection: 'row',
    justifyContent:"space-around"
  },
  infoOrder: {

  },
  text1: {
    color: "white",
    fontSize: 30,
    textAlign: "center"

  },
  text2: {
    color: "white",
    fontSize: 18,
    textAlign: "center"

  },
  text3: {
    color: "white",
    fontSize: 18,
    textAlign: "center"

  },
  img3: {
    top: 6
  }
});
