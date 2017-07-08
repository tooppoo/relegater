import { expect } from 'chai';
import { delegate } from '../src/delegater';
import * as Sample from './sample';

describe('change delegated object after call delegate/$delegate', () => {
  let base: Sample.Base;
  let delegated: Sample.Delegated;
  let result: Sample.Result;

  beforeEach(() => {
    base = Sample.createBase();
    delegated = Sample.createDelegated();
    result = delegate(base).to(delegated, 'prop2', 'method2').self as Sample.Result;
  });

  describe('when property of delegated is modified', () => {
    it('should also change that property of result', () => {
      expect(result.prop2).to.equal(delegated.prop2);

      delegated.prop2 = 'modified';

      expect(result.prop2).to.equal(delegated.prop2);
    });
  });
  describe('when method of delegated is modified', () => {
    it('should also change that result of method call', () => {
      expect(result.method2()).to.equal(delegated.method2());

      delegated.method2 = () => 100;

      expect(result.method2()).to.equal(delegated.method2());
    });
  });
});
