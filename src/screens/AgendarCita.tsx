import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import {
  Card,
  Button,
  TextInput,
  Modal,
  Portal,
  Provider,
  Text,
  IconButton,
  List,
} from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import baberia1 from "../assets/BaberShopDef.jpg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Importa el ícono que desees usar
import { styles } from "../styles/Agenda";

export default function AgendarCita() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [barber, setBarber] = useState("");
  const [barberName, setBarberName] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [optionsBarberias, setOptionsBarberias] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBarberia, setSelectedBarberia] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [barberAccordionExpanded, setBarberAccordionExpanded] = useState(true); // Mantener siempre visible
  const [appointments, setAppointments] = useState([]); // Estado para almacenar las citas agendadas

  useEffect(() => {
    obtenerBarberos();
  }, []);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const openModal = (barberia) => {
    setSelectedBarberia(barberia);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setDate("");
    setTime("");
    setBarber("");
  };

  const formatDate = (dateString, formatType) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    if ((formatType = "YYYYMMDD")) {
      return `${year}-${month}-${day}`;
    } else {
      return `${day}-${month}-${year}`;
    }
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hour = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes() + 1).padStart(2, "0");
    return `${hour}:${minutes}`;
  };

  const obtenerBarberos = async () => {
    try {
      const response = await axios.get(`${API_URL}api/datos`);
      setOptionsBarberias(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const obtenerCitasProgramadas = async () => {
    try {
      const response = await axios.get(`${API_URL}api/datos`);
      setOptionsBarberias(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const handleConfirmDate = (selectedDate) => {
    setDate(formatDate(selectedDate, "YYYYMMDD"));
    setDatePickerVisible(false);
  };

  const handleConfirmTime = (selectedTime) => {
    setTime(formatTime(selectedTime));
    setTimePickerVisible(false);
  };

  const handleSelectBarber = (idBarber, selectedBarber) => {
    setBarber(idBarber);
    setBarberName(selectedBarber);
    setBarberAccordionExpanded(false);
  };

  const handleCreateAppointment = async () => {
    if (!date || !time || !barber) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    try {
      setLoading(true);
      const url = `${API_URL}api/agenda`;
      await axios.post(url, {
        fecha: date,
        tiempo: time,
        id_Barbero: barber,
      });

      const newAppointment = {
        barberia: selectedBarberia,
        barber: barberName,
        date: date,
        time: time,
      };

      setAppointments([...appointments, newAppointment]);
      closeModal();
      Alert.alert(
        "Cita agendada",
        `Has agendado una cita en ${selectedBarberia} con ${barber} el ${date} a las ${time}`
      );
    } catch (error) {
      Alert.alert("Error", "No se registró ninguna cita.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          {/* List.Accordion para mostrar citas agendadas */}
          <List.Accordion
            title="Citas Agendadas"
            expanded={barberAccordionExpanded}
            onPress={() => setBarberAccordionExpanded(!barberAccordionExpanded)}
            style={styles.accordionContainer}
            left={(props) => <List.Icon {...props} icon="calendar-clock" />}
          >
            {appointments.map((appointment, index) => (
              <List.Item
                key={index.toString()}
                title={`${appointment.barberia} - ${appointment.barber}`}
                description={`${appointment.date} - ${appointment.time}`}
              />
            ))}
          </List.Accordion>
        </View>

        <View style={styles.separator} />

        <View style={styles.container}>
          {/* Tarjetas de barberías */}
          <Card style={styles.card}>
            <Card.Title title="Barbería 1" />
            <Card.Cover source={baberia1} />
            <Card.Actions>
              <Button onPress={() => openModal("Barbería 1")}>Agendar</Button>
            </Card.Actions>
          </Card>
          <Card style={styles.card}>
            <Card.Title title="Barbería 2" />
            <Card.Cover source={baberia1} />
            <Card.Actions>
              <Button onPress={() => openModal("Barbería 2")}>Agendar</Button>
            </Card.Actions>
          </Card>
          <Card style={styles.card}>
            <Card.Title title="Barbería 3" />
            <Card.Cover source={baberia1} />
            <Card.Actions>
              <Button onPress={() => openModal("Barbería 3")}>Agendar</Button>
            </Card.Actions>
          </Card>
          <Card style={styles.card}>
            <Card.Title title="Barbería 4" />
            <Card.Cover source={baberia1} />
            <Card.Actions>
              <Button onPress={() => openModal("Barbería 4")}>Agendar</Button>
            </Card.Actions>
          </Card>
        </View>

        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={closeModal}
            contentContainerStyle={styles.modalContainer}
          >
            <Text style={styles.title}>{selectedBarberia}</Text>
            <View style={styles.iconRow}>
              <IconButton
                icon="calendar"
                onPress={() => setDatePickerVisible(true)}
              />
              <Text style={styles.iconText}>Fecha</Text>
            </View>
            <TextInput
              label="Fecha"
              value={date}
              style={styles.input}
              disabled
            />
            <View style={styles.iconRow}>
              <IconButton
                icon="clock"
                onPress={() => setTimePickerVisible(true)}
              />
              <Text style={styles.iconText}>Hora</Text>
            </View>
            <TextInput
              label="Hora"
              value={time}
              style={styles.input}
              disabled
            />

            <List.Accordion
              title="Seleccionar Barbero"
              expanded={barberAccordionExpanded}
              onPress={() =>
                setBarberAccordionExpanded(!barberAccordionExpanded)
              }
              style={styles.input}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={() => <Icon name="account-circle" size={24} />}
                />
              )}
            >
              {optionsBarberias.map((option) => (
                <List.Item
                  key={option.id}
                  onPress={() => handleSelectBarber(option.id, option.nombre)}
                  title={option.nombre}
                />
              ))}
            </List.Accordion>
            <TextInput
              label="Barbero seleccionado"
              value={barberName}
              style={styles.input}
              disabled
            />

            <Button
              mode="contained"
              onPress={handleCreateAppointment}
              style={styles.button}
            >
              Confirmar Cita
            </Button>
          </Modal>
        </Portal>

        <DateTimePickerModal
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={() => setDatePickerVisible(false)}
        />
        <DateTimePickerModal
          isVisible={timePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={() => setTimePickerVisible(false)}
        />
      </ScrollView>
    </Provider>
  );
}
