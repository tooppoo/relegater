import { expect } from 'chai';
import { delegate } from '../src/delegater';
import * as Sample from './sample';

describe('invlalid base argument', () => {
  const shouldRaiseError = (arg: any) => {
    return () => {
      it('should raise error', () => {
        expect(() => delegate(arg)).to.throw();
      });
    }
  };

  describe('null', shouldRaiseError(null));
  describe('null', shouldRaiseError(undefined));
  describe('null', shouldRaiseError(100));
  describe('null', shouldRaiseError('invalid'));
});

describe('invalid delegated argument', () => {
  let base: Sample.Base;

  const shouldRaiseError = (arg: any) => {
    return () => {
      it('should raise error', () => {
        expect(() => delegate(base).to(arg, 'dummy')).to.throw();
      });
    }
  };

  beforeEach(() => {
    base = Sample.createBase();
  });

  describe('null', shouldRaiseError(null));
  describe('null', shouldRaiseError(undefined));
  describe('null', shouldRaiseError(100));
  describe('null', shouldRaiseError('invalid'));
});
