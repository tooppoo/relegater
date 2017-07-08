import { expect } from 'chai';
import { delegate } from '../src/delegater';
import * as Sample from './sample';

describe('specified property does not exist in delegated object', () => {
  let base: Sample.Base;
  let delegated: Sample.Delegated;

  beforeEach(() => {
    base = Sample.createBase();
    delegated = Sample.createDelegated();
  });

  it('should raise no error when unexist properties are contained', () => {
    const exec = () => {
      delegate(base).to(delegated, 'unexist1', 'unexist2');
    }
    expect(exec).to.not.throw();
  });
  it('should success to delegate properties which exist in delegated', () => {
    const result = delegate(base).to(delegated, 'prop2', 'unexist', 'method2').self as Sample.Result;

    expect(result).to.have.property('prop2');
    expect(result).to.respondTo('method2');
  });
  it('should be undefined the property which does not exist in any delegated', () => {
    const result = delegate(base).to(delegated, 'prop2', 'unexist', 'method2').self as Sample.Result;

    expect(result).to.not.have.property('unexist');
  });
  it('should be ignored the unexist property', () => {
    const dummy: any = {};

    const result = delegate(base).to(delegated, 'prop2')
                                 .to(dummy, 'prop2').self as Sample.Result;

    expect(result.prop2).to.equal(delegated.prop2);
  })
});
