import React, { Component, useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as firebase from 'firebase';
import { render } from 'react-dom';
import Loading from "../../componentes/Loading";
import UserGuest from "../MiCuenta/userGuest";
import UserLogged from "../MiCuenta/userLogged";




export default function MiCuenta() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user=> {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  

  if (login === null) { 
    return <Loading isVisible={true} text="Cargando..."/>; 
  }
  return login ? <UserLogged/> : <UserGuest/>;
  
  





}

