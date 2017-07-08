import { expect } from 'chai';
import { delegate } from '../src/delegater';
import * as Sample from './sample';

describe('common property exist in some delgated objects', () => {
  let base: Sample.Base;
  let delegated1: Sample.Delegated;
  let delegated2: Sample.Delegated;
  let result: Sample.Result;

  beforeEach(() => {
    base = Sample.createBase();
    delegated1 = Sample.createDelegated();
    delegated2 = {
      prop2: 'delegated2.prop2',
      method2: () => 2 * 100
    };

    result = delegate(base).to(delegated1, 'prop2')
                           .to(delegated2, 'prop2', 'method2')
                           .to(delegated1, 'method2')
                           .self as Sample.Result;
  });

  it('should be prefferd that later delgated object', () => {
    expect(result.method2()).to.equal(delegated1.method2());
    expect(result.prop2).to.equal(delegated2.prop2);
  });
});
