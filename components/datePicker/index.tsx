import React, { forwardRef, useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller, UseControllerProps } from 'react-hook-form';

type Props = {
    formProps: UseControllerProps;
    error?: string;
    placeholder?: string;
    mode?: 'date' | 'time' | 'datetime';
    display?: 'default' | 'spinner' | 'calendar' | 'clock';
};

const DatePicker = forwardRef<any, Props>(({ formProps, error = '', placeholder, mode = 'date', display = 'default' }, ref) => {
    const [showPicker, setShowPicker] = useState(false);

    return (
        <Controller
            render={({ field }) => (
                <View style={styles.group}>
                    <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.control}>
                        <Text style={field.value ? styles.selectedDate : styles.placeholder}>
                            {field.value ? field.value.toLocaleDateString() : placeholder || 'Selecione uma data'}
                        </Text>
                    </TouchableOpacity>
                    {showPicker && (
                        <DateTimePicker
                            value={field.value || new Date()}
                            mode={mode}
                            display={display}
                            onChange={(event, selectedDate) => {
                                setShowPicker(false);
                                if (selectedDate) {
                                    field.onChange(selectedDate);
                                }
                            }}
                        />
                    )}
                    {error && error.length > 0 && <Text style={styles.textError}>{error}</Text>}
                </View>
            )}
            {...formProps}
        />
    );
});

const styles = StyleSheet.create({
    group: {
        marginBottom: 16,
    },
    control: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 12,
    },
    placeholder: {
        color: '#888',
    },
    selectedDate: {
        color: '#000',
    },
    textError: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default DatePicker;