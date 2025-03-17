import React, { forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Controller, UseControllerProps } from 'react-hook-form';

type Props = {
    formProps: UseControllerProps;
    items: { label: string; value: string }[];
    error?: string;
    placeholder?: string;
};

const Select = forwardRef<Picker<string>, Props>(({ formProps, items, error = '', placeholder }, ref) => {
    return (
        <Controller
            render={({ field }) => (
                <View style={styles.group}>
                    <Picker
                        ref={ref}
                        selectedValue={field.value}
                        onValueChange={field.onChange}
                        style={styles.control}
                    >
                        {/* Adiciona um item placeholder */}
                        {placeholder && <Picker.Item label={placeholder} value="" />}
                        {items.map((item, index) => (
                            <Picker.Item key={index} label={item.label} value={item.value} />
                        ))}
                    </Picker>
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
        padding: 8,
    },
    textError: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default Select;