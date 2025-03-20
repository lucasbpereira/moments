import React, { forwardRef } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Controller, UseControllerProps } from 'react-hook-form';

type Props = {
    formProps: UseControllerProps;
    label?: string;
    error?: string;
};

const Toggle = forwardRef<Switch, Props>(({ formProps, label = '', error = '' }, ref) => {
    return (
        <Controller
            render={({ field }) => (
                <View style={styles.group}>
                    {label && <Text style={styles.label}>{label}</Text>}
                    <Switch
                        ref={ref}
                        value={field.value}
                        onValueChange={field.onChange}
                        style={styles.control}
                    />
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
        alignSelf: 'flex-start',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    textError: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default Toggle;