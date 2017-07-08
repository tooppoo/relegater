import { expect } from 'chai';
import { delegate, $delegate } from '../src/delegater';
import * as Sample from './sample';

/*
 * test core function of delgate-js
 */

interface Delegated2 {
  prop3: string;
  method3: (v: number) => number;
}
type Result = Sample.Result & Delegated2;

describe('core', () => {
  const delegated2: Delegated2 = {
    prop3: 'prop3',
    method3: v => v ** 2
  };
  let base: Sample.Base;
  let delegated: Sample.Delegated;

  beforeEach(() => {
    base = Sample.createBase();
    delegated = Sample.createDelegated();
  });

  describe('delegate()', () => {
    let result: Result;

    beforeEach(() => {
      result = delegate(base).to(delegated, 'prop2', 'method2')
                             .to(delegated2, 'method3')
                             .self as Result;
    });
    describe('returns object', () => {
      it('should be not same with base', () => {
        expect(result).to.be.not.equal(base);
      });
      it('should have property which delegated has', () => {
        expect(result).to.respondTo('method2');
        expect(result).to.have.property('prop2');
        expect(result.method3(3)).to.equal(9);
      });
      it('should have property which base has', () => {
        expect(result).to.respondTo('method');
        expect(result).to.have.property('prop');
      });
    });
    describe('not modify base object', () => {
      it('should not have property which delegated has', () => {
        expect(base).to.not.respondTo('method2');
        expect(base).to.not.have.property('prop2');
        expect(base).to.not.respondTo('method3');
      });
      it('should have property and method which belong to self', () => {
        expect(base).to.respondTo('method');
        expect(base).to.have.property('prop');
      });
    });
    describe('unspecified prop', () => {
      it('should not be delegated', () => {
        expect(result).to.not.have.property('prop3');
      });
    });
  });

  describe('$delegate()', () => {
    beforeEach(() => {
      $delegate(base).to(delegated, 'prop2', 'method2')
                     .to(delegated2, 'method3');
    });

    describe('modify base destructively', () => {
      it('should have property which delegated has', () => {
        expect(base).to.respondTo('method2');
        expect(base).to.have.property('prop2');
        expect((<Result>base).method3(3)).to.equal(9);
      });
      it('should have property which base has', () => {
        expect(base).to.respondTo('method');
        expect(base).to.have.property('prop');
      });
    });

    describe('unspecified prop', () => {
      it('should not be delegated', () => {
        expect(base).to.not.have.property('prop3');
      });
    });
  });
});
