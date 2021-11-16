//import React from 'react';
//import { render, screen } from '@testing-library/react';
import WordData from './WordData'

describe("word constructor", () => {
    test('correct population of parameters', () => {
        const word = new WordData({ word: "dummy", score:101, defs:["def 1", "def 2"], tags:["f:10"]});
        
        expect(word.word).toBe("dummy");
        expect(word.score).toBe(101);
        expect(word.frequency).toBe(10);
        expect(word.defs).toBeDefined();
    });

    test('correct population of empty object', () => {
        const word = new WordData({});

        expect(word.word).toBeUndefined();
        expect(word.score).toBeUndefined();
        expect(word.frequency).toBeUndefined();
        expect(word.defs).toBeUndefined();
    });
});

describe("word frequency tests", () => {

    test('correct word frequency if frequency specified', () => {
        const word = new WordData({ tags:["f:1.1"]});
        expect(word.frequency).toBe(1.1);
    });

    test('correct word frequency if frequency not specified', () => {
        const word = new WordData({ word: "dummy"});
        expect(word.frequency).toBeUndefined();
    });
})

