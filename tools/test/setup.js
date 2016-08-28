/**
 * @module this modules is executed by mocha before tests,
 * place setup code here .
 */
import mongoose from 'mongoose';


/**
 * assign mongoose promises as native promises.
 */
mongoose.Promise = Promise;


/*
eslint
import/no-extraneous-dependencies: 0,
*/
