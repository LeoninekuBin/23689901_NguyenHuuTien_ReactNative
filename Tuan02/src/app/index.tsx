import { exer01 } from '@/exercises/Ex01';
import { exer02 } from '@/exercises/Ex02';
import { exer03 } from '@/exercises/Ex03';
import { exer04 } from '@/exercises/Ex04';
import { simulateTask } from '@/exercises/Ex05';

import { exer06 } from '@/exercises/Ex06';
import { exer07 } from '@/exercises/Ex07';
import { exer08 } from '@/exercises/Ex08';
import { exer09 } from '@/exercises/Ex09';
import { exer10 } from '@/exercises/Ex10';
import { exer11 } from '@/exercises/Ex11';
import { exer12 } from '@/exercises/Ex12';
import { exer13 } from '@/exercises/Ex13';
import { exer14 } from '@/exercises/Ex14';
import { exer15 } from '@/exercises/Ex15';
import { exer16 } from '@/exercises/Ex16';
import { exer17 } from '@/exercises/Ex17';
import { fetchUser } from '@/exercises/Ex18';
import { fetchUsers } from '@/exercises/Ex19';
import { exer20 } from '@/exercises/Ex20';
import { exer21 } from '@/exercises/Ex21';
import { exer22 } from '@/exercises/Ex22';
import { exer23 } from '@/exercises/Ex23';
import { exer24 } from '@/exercises/Ex24';
import { dodownloadFile } from '@/exercises/Ex25';
import { exer26 } from '@/exercises/Ex26';
import { fetchWithRetry } from '@/exercises/Ex27';
import { batchProcess } from '@/exercises/Ex28';
import { queueProcess } from '@/exercises/Ex29';
import { exer30 } from '@/exercises/Ex30';

import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
    const [resultExer01, setResultExer01] = useState<string>('');
    const [resultExer02, setResultExer02] = useState<number>();
    const [resultExer03, setResultExer03] = useState<string>('');
    const [resultExer04, setResultExer04] = useState<number>();
    const [resultExer05, setResultExer05] = useState<string>('');
    const [resultExer06, setResultExer06] = useState<string[]>([]);
    const [resultExer07, setResultExer07] = useState<string>('');
    const [resultExer08, setResultExer08] = useState<number>();
    const [resultExer09, setResultExer09] = useState<number[]>([]);
    const [resultExer10, setResultExer10] = useState<string>('');
    const [resultExer11, setResultExer11] = useState<string>('');
    const [resultExer12, setResultExer12] = useState<string>('');
    const [resultExer13, setResultExer13] = useState<string>('');
    const [resultExer14, setResultExer14] = useState<number>();
    const [resultExer15, setResultExer15] = useState<number[]>([]);
    const [resultExer16, setResultExer16] = useState<number[]>([]);
    const [resultExer17, setResultExer17] = useState<number[]>([]);
    const [resultExer18, setResultExer18] = useState<string>('');
    const [resultExer19, setResultExer19] = useState<string>('');
    const [resultExer20, setResultExer20] = useState<string>('');
    const [resultExer21, setResultExer21] = useState<string>('');
    const [resultExer22, setResultExer22] = useState<string>('');
    const [resultExer23, setResultExer23] = useState<string>('');
    const [resultExer24, setResultExer24] = useState<string>('');
    const [resultExer25, setResultExer25] = useState<string>('');
    const [resultExer26, setResultExer26] = useState<string>('');
    const [resultExer27, setResultExer27] = useState<string>('');
    const [resultExer28, setResultExer28] = useState<string[]>([]);
    const [resultExer29, setResultExer29] = useState<string[]>([]);
    const [resultExer30, setResultExer30] = useState<string[]>([]);

    useEffect(() => {
        exer01().then((data) => {
            setResultExer01(data);
        });

        exer02().then((data) => {
            setResultExer02(data);
        });

        exer03().then(() => {
                setResultExer03('Success');
            }).catch((error) => {
                setResultExer03(error.message);
            });

        exer04().then((data) => {
            setResultExer04(data);
        });

        simulateTask(2000).then((data) => {
            setResultExer05(data);
        });

        exer06().then((data) => {
            setResultExer06(data);
        });

        exer07().then((data) => {
            setResultExer07(data);
        });

        exer08().then((data) => {
            setResultExer08(data);
        });

        exer09().then((data) => {
            setResultExer09(data);
        });

        exer10().then((data) => {
            setResultExer10(data);
        });

        exer11().then((data) => {
            setResultExer11(data);
        });

        exer12().then((data) => {
            setResultExer12(data);
        });

        exer13().then((data) => {
            setResultExer13(data);
        });

        exer14(10).then((data) => {
            setResultExer14(data);
        });

        exer15().then((data) => {
            setResultExer15(data);
        });

        exer16().then((data) => {
            setResultExer16(data);
        });

        exer17().then((data) => {
            setResultExer17(data);
        });

        fetchUser(1).then((data) => {
            setResultExer18(JSON.stringify(data));
        });

        fetchUsers([1, 2, 3]).then((data) => {
            setResultExer19(JSON.stringify(data));
        });

        exer20(1).then((data) => {
            setResultExer20(typeof data === 'string' ? data : JSON.stringify(data));
        });

        exer21().then((data) => {
            setResultExer21(JSON.stringify(data));
        });

        exer22().then((data) => {
            setResultExer22(JSON.stringify(data));
        });

        exer23().then((data) => {
            setResultExer23(JSON.stringify(data));
        });

        exer24().then((data) => {
            setResultExer24(JSON.stringify(data));
        });

        dodownloadFile().then((data) => {
            setResultExer25(data);
        });

        exer26().then((data) => {
            setResultExer26(data);
        });

        fetchWithRetry('https://jsonplaceholder.typicode.com/todos/1', 3)
            .then((data) => {
                setResultExer27(JSON.stringify(data));
            }).catch((error) => {
                setResultExer27(error.message);
            });

        batchProcess().then((data) => {
            setResultExer28(data);
        });

        queueProcess().then((data) => {
            setResultExer29(data);
        });

        exer30().then((data) => {
            setResultExer30(data);
        });
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>
                Exercise 01
            </Text>

            <Text style={styles.result}>
                {resultExer01}
            </Text>

            <Text style={styles.title}>
                Exercise 02
            </Text>

            <Text style={styles.result}>
                {resultExer02}
            </Text>

            <Text style={styles.title}>
                Exercise 03
            </Text>

            <Text style={styles.result}>
                {resultExer03}
            </Text>

            <Text style={styles.title}>
                Exercise 04
            </Text>

            <Text style={styles.result}>
                {resultExer04}
            </Text>

            <Text style={styles.title}>
                Exercise 05
            </Text>

            <Text style={styles.result}>
                {resultExer05}
            </Text>

            <Text style={styles.title}>
                Exercise 06
            </Text>

            <Text style={styles.result}>
                {resultExer06.join('\n')}
            </Text>

            <Text style={styles.title}>
                Exercise 07
            </Text>

            <Text style={styles.result}>
                {resultExer07}
            </Text>

            <Text style={styles.title}>
                Exercise 08
            </Text>

            <Text style={styles.result}>
                {resultExer08}
            </Text>

            <Text style={styles.title}>
                Exercise 09
            </Text>

            <Text style={styles.result}>
                {resultExer09.join(', ')}
            </Text>

            <Text style={styles.title}>
                Exercise 10
            </Text>

            <Text style={styles.result}>
                {resultExer10}
            </Text>

            <Text style={styles.title}>
                Exercise 11
            </Text>

            <Text style={styles.result}>
                {resultExer11}
            </Text>

            <Text style={styles.title}>
                Exercise 12
            </Text>

            <Text style={styles.result}>
                {resultExer12}
            </Text>

            <Text style={styles.title}>
                Exercise 13
            </Text>

            <Text style={styles.result}>
                {resultExer13}
            </Text>

            <Text style={styles.title}>
                Exercise 14
            </Text>

            <Text style={styles.result}>
                {resultExer14}
            </Text>

            <Text style={styles.title}>
                Exercise 15
            </Text>

            <Text style={styles.result}>
                {resultExer15.join(', ')}
            </Text>

            <Text style={styles.title}>
                Exercise 16
            </Text>

            <Text style={styles.result}>
                {resultExer16.join(', ')}
            </Text>

            <Text style={styles.title}>
                Exercise 17
            </Text>

            <Text style={styles.result}>
                {resultExer17.join(', ')}
            </Text>

            <Text style={styles.title}>
                Exercise 18
            </Text>

            <Text style={styles.result}>
                {resultExer18}
            </Text>

            <Text style={styles.title}>
                Exercise 19
            </Text>

            <Text style={styles.result}>
                {resultExer19}
            </Text>

            <Text style={styles.title}>
                Exercise 20
            </Text>

            <Text style={styles.result}>
                {resultExer20}
            </Text>

            <Text style={styles.title}>
                Exercise 21
            </Text>

            <Text style={styles.result}>
                {resultExer21}
            </Text>

            <Text style={styles.title}>
                Exercise 22
            </Text>

            <Text style={styles.result}>
                {resultExer22}
            </Text>

            <Text style={styles.title}>
                Exercise 23
            </Text>

            <Text style={styles.result}>
                {resultExer23}
            </Text>

            <Text style={styles.title}>
                Exercise 24
            </Text>

            <Text style={styles.result}>
                {resultExer24}
            </Text>

            <Text style={styles.title}>
                Exercise 25
            </Text>

            <Text style={styles.result}>
                {resultExer25}
            </Text>

            <Text style={styles.title}>
                Exercise 26
            </Text>

            <Text style={styles.result}>
                {resultExer26}
            </Text>

            <Text style={styles.title}>
                Exercise 27
            </Text>

            <Text style={styles.result}>
                {resultExer27}
            </Text>

            <Text style={styles.title}>
                Exercise 28
            </Text>

            <Text style={styles.result}>
                {resultExer28.join('\n')}
            </Text>

            <Text style={styles.title}>
                Exercise 29
            </Text>

            <Text style={styles.result}>
                {resultExer29.join('\n')}
            </Text>

            <Text style={styles.title}>
                Exercise 30
            </Text>

            <Text style={styles.result}>
                {resultExer30.join(', ')}
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 40,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    result: {
        fontSize: 18,
        lineHeight: 30,
        marginBottom: 20,
    },
});
