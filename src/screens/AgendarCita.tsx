import React, { useState } from 'react';
import { View, ScrollView, Alert, StyleSheet } from 'react-native';
import { Card, Button, TextInput, Modal, Portal, Provider, Text, IconButton, List } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import baberia1 from '../assets/BaberShopDef.jpg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importa el ícono que desees usar
import { styles } from '../styles/Agenda';

const BarberSchedule = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [barber, setBarber] = useState('');
    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBarberia, setSelectedBarberia] = useState(null);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const [barberAccordionExpanded, setBarberAccordionExpanded] = useState(true); // Mantener siempre visible
    const [appointments, setAppointments] = useState([]); // Estado para almacenar las citas agendadas

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const openModal = (barberia) => {
        setSelectedBarberia(barberia);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setDate('');
        setTime('');
        setBarber('');
    };

    const handleConfirmDate = (selectedDate) => {
        setDate(selectedDate.toLocaleDateString());
        setDatePickerVisible(false);
    };

    const handleConfirmTime = (selectedTime) => {
        setTime(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setTimePickerVisible(false);
    };

    const handleSelectBarber = (selectedBarber) => {
        setBarber(selectedBarber);
        setBarberAccordionExpanded(false);
    };

    const handleCreateAppointment = () => {
        if (!date || !time || !barber) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        const newAppointment = {
            barberia: selectedBarberia,
            barber: barber,
            date: date,
            time: time,
        };

        setAppointments([...appointments, newAppointment]);
        closeModal();
        Alert.alert('Cita agendada', `Has agendado una cita en ${selectedBarberia} con ${barber} el ${date} a las ${time}`);
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

                {/* Espacio entre citas agendadas y las tarjetas de barberías */}
                <View style={styles.separator} />

                <View style={styles.container}>
                    {/* Tarjetas de barberías */}
                    <Card style={styles.card}>
                        <Card.Title title="Barbería 1" />
                        <Card.Cover source={baberia1} />
                        <Card.Actions>
                            <Button onPress={() => openModal('Barbería 1')}>Agendar</Button>
                        </Card.Actions>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Title title="Barbería 2" />
                        <Card.Cover source={baberia1} />
                        <Card.Actions>
                            <Button onPress={() => openModal('Barbería 2')}>Agendar</Button>
                        </Card.Actions>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Title title="Barbería 3" />
                        <Card.Cover source={baberia1} />
                        <Card.Actions>
                            <Button onPress={() => openModal('Barbería 3')}>Agendar</Button>
                        </Card.Actions>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Title title="Barbería 4" />
                        <Card.Cover source={baberia1} />
                        <Card.Actions>
                            <Button onPress={() => openModal('Barbería 4')}>Agendar</Button>
                        </Card.Actions>
                    </Card>
                </View>

                <Portal>
                    <Modal visible={modalVisible} onDismiss={closeModal} contentContainerStyle={styles.modalContainer}>
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
                            onPress={() => setBarberAccordionExpanded(!barberAccordionExpanded)}
                            style={styles.input}
                            left={(props) => <List.Icon {...props} icon={() => <Icon name="account-circle" size={24} />} />}
                        >
                            <List.Item title="Eduardo" onPress={() => handleSelectBarber('Eduardo')} />
                            <List.Item title="Mario" onPress={() => handleSelectBarber('Mario')} />
                            <List.Item title="Luis" onPress={() => handleSelectBarber('Luis')} />
                        </List.Accordion>
                        <TextInput
                            label="Barbero seleccionado"
                            value={barber}
                            style={styles.input}
                            disabled
                        />
                        <Button mode="contained" onPress={handleCreateAppointment} style={styles.button}>
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
};



export default BarberSchedule;
