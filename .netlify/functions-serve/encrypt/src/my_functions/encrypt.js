var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/fp-ts/lib/function.js
var require_function = __commonJS({
  "node_modules/fp-ts/lib/function.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEndomorphismMonoid = exports.not = exports.SK = exports.hole = exports.pipe = exports.untupled = exports.tupled = exports.absurd = exports.decrement = exports.increment = exports.tuple = exports.flow = exports.flip = exports.constVoid = exports.constUndefined = exports.constNull = exports.constFalse = exports.constTrue = exports.constant = exports.unsafeCoerce = exports.identity = exports.apply = exports.getRing = exports.getSemiring = exports.getMonoid = exports.getSemigroup = exports.getBooleanAlgebra = void 0;
    var getBooleanAlgebra = function(B) {
      return function() {
        return {
          meet: function(x, y) {
            return function(a) {
              return B.meet(x(a), y(a));
            };
          },
          join: function(x, y) {
            return function(a) {
              return B.join(x(a), y(a));
            };
          },
          zero: function() {
            return B.zero;
          },
          one: function() {
            return B.one;
          },
          implies: function(x, y) {
            return function(a) {
              return B.implies(x(a), y(a));
            };
          },
          not: function(x) {
            return function(a) {
              return B.not(x(a));
            };
          }
        };
      };
    };
    exports.getBooleanAlgebra = getBooleanAlgebra;
    var getSemigroup = function(S) {
      return function() {
        return {
          concat: function(f, g) {
            return function(a) {
              return S.concat(f(a), g(a));
            };
          }
        };
      };
    };
    exports.getSemigroup = getSemigroup;
    var getMonoid = function(M) {
      var getSemigroupM = exports.getSemigroup(M);
      return function() {
        return {
          concat: getSemigroupM().concat,
          empty: function() {
            return M.empty;
          }
        };
      };
    };
    exports.getMonoid = getMonoid;
    var getSemiring = function(S) {
      return {
        add: function(f, g) {
          return function(x) {
            return S.add(f(x), g(x));
          };
        },
        zero: function() {
          return S.zero;
        },
        mul: function(f, g) {
          return function(x) {
            return S.mul(f(x), g(x));
          };
        },
        one: function() {
          return S.one;
        }
      };
    };
    exports.getSemiring = getSemiring;
    var getRing = function(R) {
      var S = exports.getSemiring(R);
      return {
        add: S.add,
        mul: S.mul,
        one: S.one,
        zero: S.zero,
        sub: function(f, g) {
          return function(x) {
            return R.sub(f(x), g(x));
          };
        }
      };
    };
    exports.getRing = getRing;
    var apply = function(a) {
      return function(f) {
        return f(a);
      };
    };
    exports.apply = apply;
    function identity(a) {
      return a;
    }
    exports.identity = identity;
    exports.unsafeCoerce = identity;
    function constant(a) {
      return function() {
        return a;
      };
    }
    exports.constant = constant;
    exports.constTrue = /* @__PURE__ */ constant(true);
    exports.constFalse = /* @__PURE__ */ constant(false);
    exports.constNull = /* @__PURE__ */ constant(null);
    exports.constUndefined = /* @__PURE__ */ constant(void 0);
    exports.constVoid = exports.constUndefined;
    function flip(f) {
      return function(b, a) {
        return f(a, b);
      };
    }
    exports.flip = flip;
    function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
      switch (arguments.length) {
        case 1:
          return ab;
        case 2:
          return function() {
            return bc(ab.apply(this, arguments));
          };
        case 3:
          return function() {
            return cd(bc(ab.apply(this, arguments)));
          };
        case 4:
          return function() {
            return de(cd(bc(ab.apply(this, arguments))));
          };
        case 5:
          return function() {
            return ef(de(cd(bc(ab.apply(this, arguments)))));
          };
        case 6:
          return function() {
            return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
          };
        case 7:
          return function() {
            return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
          };
        case 8:
          return function() {
            return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
          };
        case 9:
          return function() {
            return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
          };
      }
      return;
    }
    exports.flow = flow;
    function tuple() {
      var t = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
      }
      return t;
    }
    exports.tuple = tuple;
    function increment(n) {
      return n + 1;
    }
    exports.increment = increment;
    function decrement(n) {
      return n - 1;
    }
    exports.decrement = decrement;
    function absurd(_) {
      throw new Error("Called `absurd` function which should be uncallable");
    }
    exports.absurd = absurd;
    function tupled(f) {
      return function(a) {
        return f.apply(void 0, a);
      };
    }
    exports.tupled = tupled;
    function untupled(f) {
      return function() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          a[_i] = arguments[_i];
        }
        return f(a);
      };
    }
    exports.untupled = untupled;
    function pipe2(a, ab, bc, cd, de, ef, fg, gh, hi) {
      switch (arguments.length) {
        case 1:
          return a;
        case 2:
          return ab(a);
        case 3:
          return bc(ab(a));
        case 4:
          return cd(bc(ab(a)));
        case 5:
          return de(cd(bc(ab(a))));
        case 6:
          return ef(de(cd(bc(ab(a)))));
        case 7:
          return fg(ef(de(cd(bc(ab(a))))));
        case 8:
          return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
          return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        default:
          var ret = arguments[0];
          for (var i = 1; i < arguments.length; i++) {
            ret = arguments[i](ret);
          }
          return ret;
      }
    }
    exports.pipe = pipe2;
    exports.hole = absurd;
    var SK = function(_, b) {
      return b;
    };
    exports.SK = SK;
    function not(predicate) {
      return function(a) {
        return !predicate(a);
      };
    }
    exports.not = not;
    var getEndomorphismMonoid = function() {
      return {
        concat: function(first, second) {
          return flow(first, second);
        },
        empty: identity
      };
    };
    exports.getEndomorphismMonoid = getEndomorphismMonoid;
  }
});

// node_modules/fp-ts/lib/Apply.js
var require_Apply = __commonJS({
  "node_modules/fp-ts/lib/Apply.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sequenceS = exports.sequenceT = exports.getApplySemigroup = exports.apS = exports.apSecond = exports.apFirst = exports.ap = void 0;
    var function_1 = require_function();
    function ap(F, G) {
      return function(fa) {
        return function(fab) {
          return F.ap(F.map(fab, function(gab) {
            return function(ga) {
              return G.ap(gab, ga);
            };
          }), fa);
        };
      };
    }
    exports.ap = ap;
    function apFirst(A) {
      return function(second) {
        return function(first) {
          return A.ap(A.map(first, function(a) {
            return function() {
              return a;
            };
          }), second);
        };
      };
    }
    exports.apFirst = apFirst;
    function apSecond(A) {
      return function(second) {
        return function(first) {
          return A.ap(A.map(first, function() {
            return function(b) {
              return b;
            };
          }), second);
        };
      };
    }
    exports.apSecond = apSecond;
    function apS(F) {
      return function(name, fb) {
        return function(fa) {
          return F.ap(F.map(fa, function(a) {
            return function(b) {
              var _a;
              return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
            };
          }), fb);
        };
      };
    }
    exports.apS = apS;
    function getApplySemigroup(F) {
      return function(S) {
        return {
          concat: function(first, second) {
            return F.ap(F.map(first, function(x) {
              return function(y) {
                return S.concat(x, y);
              };
            }), second);
          }
        };
      };
    }
    exports.getApplySemigroup = getApplySemigroup;
    function curried(f, n, acc) {
      return function(x) {
        var combined = Array(acc.length + 1);
        for (var i = 0; i < acc.length; i++) {
          combined[i] = acc[i];
        }
        combined[acc.length] = x;
        return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined);
      };
    }
    var tupleConstructors = {
      1: function(a) {
        return [a];
      },
      2: function(a) {
        return function(b) {
          return [a, b];
        };
      },
      3: function(a) {
        return function(b) {
          return function(c) {
            return [a, b, c];
          };
        };
      },
      4: function(a) {
        return function(b) {
          return function(c) {
            return function(d) {
              return [a, b, c, d];
            };
          };
        };
      },
      5: function(a) {
        return function(b) {
          return function(c) {
            return function(d) {
              return function(e) {
                return [a, b, c, d, e];
              };
            };
          };
        };
      }
    };
    function getTupleConstructor(len) {
      if (!tupleConstructors.hasOwnProperty(len)) {
        tupleConstructors[len] = curried(function_1.tuple, len - 1, []);
      }
      return tupleConstructors[len];
    }
    function sequenceT(F) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var len = args.length;
        var f = getTupleConstructor(len);
        var fas = F.map(args[0], f);
        for (var i = 1; i < len; i++) {
          fas = F.ap(fas, args[i]);
        }
        return fas;
      };
    }
    exports.sequenceT = sequenceT;
    function getRecordConstructor(keys) {
      var len = keys.length;
      switch (len) {
        case 1:
          return function(a) {
            var _a;
            return _a = {}, _a[keys[0]] = a, _a;
          };
        case 2:
          return function(a) {
            return function(b) {
              var _a;
              return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a;
            };
          };
        case 3:
          return function(a) {
            return function(b) {
              return function(c) {
                var _a;
                return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a;
              };
            };
          };
        case 4:
          return function(a) {
            return function(b) {
              return function(c) {
                return function(d) {
                  var _a;
                  return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a[keys[3]] = d, _a;
                };
              };
            };
          };
        case 5:
          return function(a) {
            return function(b) {
              return function(c) {
                return function(d) {
                  return function(e) {
                    var _a;
                    return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a[keys[3]] = d, _a[keys[4]] = e, _a;
                  };
                };
              };
            };
          };
        default:
          return curried(function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            var r = {};
            for (var i = 0; i < len; i++) {
              r[keys[i]] = args[i];
            }
            return r;
          }, len - 1, []);
      }
    }
    function sequenceS(F) {
      return function(r) {
        var keys = Object.keys(r);
        var len = keys.length;
        var f = getRecordConstructor(keys);
        var fr = F.map(r[keys[0]], f);
        for (var i = 1; i < len; i++) {
          fr = F.ap(fr, r[keys[i]]);
        }
        return fr;
      };
    }
    exports.sequenceS = sequenceS;
  }
});

// node_modules/fp-ts/lib/Functor.js
var require_Functor = __commonJS({
  "node_modules/fp-ts/lib/Functor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFunctorComposition = exports.bindTo = exports.flap = exports.map = void 0;
    var function_1 = require_function();
    function map(F, G) {
      return function(f) {
        return function(fa) {
          return F.map(fa, function(ga) {
            return G.map(ga, f);
          });
        };
      };
    }
    exports.map = map;
    function flap(F) {
      return function(a) {
        return function(fab) {
          return F.map(fab, function(f) {
            return f(a);
          });
        };
      };
    }
    exports.flap = flap;
    function bindTo(F) {
      return function(name) {
        return function(fa) {
          return F.map(fa, function(a) {
            var _a;
            return _a = {}, _a[name] = a, _a;
          });
        };
      };
    }
    exports.bindTo = bindTo;
    function getFunctorComposition(F, G) {
      var _map = map(F, G);
      return {
        map: function(fga, f) {
          return function_1.pipe(fga, _map(f));
        }
      };
    }
    exports.getFunctorComposition = getFunctorComposition;
  }
});

// node_modules/fp-ts/lib/Applicative.js
var require_Applicative = __commonJS({
  "node_modules/fp-ts/lib/Applicative.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getApplicativeComposition = exports.getApplicativeMonoid = void 0;
    var Apply_1 = require_Apply();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    function getApplicativeMonoid(F) {
      var f = Apply_1.getApplySemigroup(F);
      return function(M) {
        return {
          concat: f(M).concat,
          empty: F.of(M.empty)
        };
      };
    }
    exports.getApplicativeMonoid = getApplicativeMonoid;
    function getApplicativeComposition(F, G) {
      var map = Functor_1.getFunctorComposition(F, G).map;
      var _ap = Apply_1.ap(F, G);
      return {
        map,
        of: function(a) {
          return F.of(G.of(a));
        },
        ap: function(fgab, fga) {
          return function_1.pipe(fgab, _ap(fga));
        }
      };
    }
    exports.getApplicativeComposition = getApplicativeComposition;
  }
});

// node_modules/fp-ts/lib/Chain.js
var require_Chain = __commonJS({
  "node_modules/fp-ts/lib/Chain.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bind = exports.chainFirst = void 0;
    function chainFirst(M) {
      return function(f) {
        return function(first) {
          return M.chain(first, function(a) {
            return M.map(f(a), function() {
              return a;
            });
          });
        };
      };
    }
    exports.chainFirst = chainFirst;
    function bind(M) {
      return function(name, f) {
        return function(ma) {
          return M.chain(ma, function(a) {
            return M.map(f(a), function(b) {
              var _a;
              return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
            });
          });
        };
      };
    }
    exports.bind = bind;
  }
});

// node_modules/fp-ts/lib/ChainRec.js
var require_ChainRec = __commonJS({
  "node_modules/fp-ts/lib/ChainRec.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tailRec = void 0;
    var tailRec = function(startWith, f) {
      var ab = f(startWith);
      while (ab._tag === "Left") {
        ab = f(ab.left);
      }
      return ab.right;
    };
    exports.tailRec = tailRec;
  }
});

// node_modules/fp-ts/lib/internal.js
var require_internal = __commonJS({
  "node_modules/fp-ts/lib/internal.js"(exports) {
    "use strict";
    var __spreadArray = exports && exports.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromReadonlyNonEmptyArray = exports.has = exports.emptyRecord = exports.emptyReadonlyArray = exports.tail = exports.head = exports.isNonEmpty = exports.singleton = exports.right = exports.left = exports.isRight = exports.isLeft = exports.some = exports.none = exports.isSome = exports.isNone = void 0;
    var isNone = function(fa) {
      return fa._tag === "None";
    };
    exports.isNone = isNone;
    var isSome = function(fa) {
      return fa._tag === "Some";
    };
    exports.isSome = isSome;
    exports.none = { _tag: "None" };
    var some = function(a) {
      return { _tag: "Some", value: a };
    };
    exports.some = some;
    var isLeft = function(ma) {
      return ma._tag === "Left";
    };
    exports.isLeft = isLeft;
    var isRight = function(ma) {
      return ma._tag === "Right";
    };
    exports.isRight = isRight;
    var left2 = function(e) {
      return { _tag: "Left", left: e };
    };
    exports.left = left2;
    var right2 = function(a) {
      return { _tag: "Right", right: a };
    };
    exports.right = right2;
    var singleton = function(a) {
      return [a];
    };
    exports.singleton = singleton;
    var isNonEmpty = function(as) {
      return as.length > 0;
    };
    exports.isNonEmpty = isNonEmpty;
    var head = function(as) {
      return as[0];
    };
    exports.head = head;
    var tail = function(as) {
      return as.slice(1);
    };
    exports.tail = tail;
    exports.emptyReadonlyArray = [];
    exports.emptyRecord = {};
    exports.has = Object.prototype.hasOwnProperty;
    var fromReadonlyNonEmptyArray = function(as) {
      return __spreadArray([as[0]], as.slice(1));
    };
    exports.fromReadonlyNonEmptyArray = fromReadonlyNonEmptyArray;
  }
});

// node_modules/fp-ts/lib/FromEither.js
var require_FromEither = __commonJS({
  "node_modules/fp-ts/lib/FromEither.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.filterOrElse = exports.chainEitherK = exports.fromEitherK = exports.chainOptionK = exports.fromOptionK = exports.fromPredicate = exports.fromOption = void 0;
    var function_1 = require_function();
    var _ = __importStar(require_internal());
    function fromOption(F) {
      return function(onNone) {
        return function(ma) {
          return F.fromEither(_.isNone(ma) ? _.left(onNone()) : _.right(ma.value));
        };
      };
    }
    exports.fromOption = fromOption;
    function fromPredicate(F) {
      return function(predicate, onFalse) {
        return function(a) {
          return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a)));
        };
      };
    }
    exports.fromPredicate = fromPredicate;
    function fromOptionK(F) {
      var fromOptionF = fromOption(F);
      return function(onNone) {
        var from = fromOptionF(onNone);
        return function(f) {
          return function_1.flow(f, from);
        };
      };
    }
    exports.fromOptionK = fromOptionK;
    function chainOptionK(F, M) {
      var fromOptionKF = fromOptionK(F);
      return function(onNone) {
        var from = fromOptionKF(onNone);
        return function(f) {
          return function(ma) {
            return M.chain(ma, from(f));
          };
        };
      };
    }
    exports.chainOptionK = chainOptionK;
    function fromEitherK(F) {
      return function(f) {
        return function_1.flow(f, F.fromEither);
      };
    }
    exports.fromEitherK = fromEitherK;
    function chainEitherK(F, M) {
      var fromEitherKF = fromEitherK(F);
      return function(f) {
        return function(ma) {
          return M.chain(ma, fromEitherKF(f));
        };
      };
    }
    exports.chainEitherK = chainEitherK;
    function filterOrElse(F, M) {
      return function(predicate, onFalse) {
        return function(ma) {
          return M.chain(ma, function(a) {
            return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a)));
          });
        };
      };
    }
    exports.filterOrElse = filterOrElse;
  }
});

// node_modules/fp-ts/lib/Separated.js
var require_Separated = __commonJS({
  "node_modules/fp-ts/lib/Separated.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.right = exports.left = exports.flap = exports.Functor = exports.Bifunctor = exports.URI = exports.bimap = exports.mapLeft = exports.map = exports.separated = void 0;
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var separated = function(left3, right3) {
      return { left: left3, right: right3 };
    };
    exports.separated = separated;
    var _map = function(fa, f) {
      return function_1.pipe(fa, exports.map(f));
    };
    var _mapLeft = function(fa, f) {
      return function_1.pipe(fa, exports.mapLeft(f));
    };
    var _bimap = function(fa, g, f) {
      return function_1.pipe(fa, exports.bimap(g, f));
    };
    var map = function(f) {
      return function(fa) {
        return exports.separated(exports.left(fa), f(exports.right(fa)));
      };
    };
    exports.map = map;
    var mapLeft = function(f) {
      return function(fa) {
        return exports.separated(f(exports.left(fa)), exports.right(fa));
      };
    };
    exports.mapLeft = mapLeft;
    var bimap = function(f, g) {
      return function(fa) {
        return exports.separated(f(exports.left(fa)), g(exports.right(fa)));
      };
    };
    exports.bimap = bimap;
    exports.URI = "Separated";
    exports.Bifunctor = {
      URI: exports.URI,
      mapLeft: _mapLeft,
      bimap: _bimap
    };
    exports.Functor = {
      URI: exports.URI,
      map: _map
    };
    exports.flap = /* @__PURE__ */ Functor_1.flap(exports.Functor);
    var left2 = function(s) {
      return s.left;
    };
    exports.left = left2;
    var right2 = function(s) {
      return s.right;
    };
    exports.right = right2;
  }
});

// node_modules/fp-ts/lib/Witherable.js
var require_Witherable = __commonJS({
  "node_modules/fp-ts/lib/Witherable.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.filterE = exports.witherDefault = exports.wiltDefault = void 0;
    var _ = __importStar(require_internal());
    function wiltDefault(T, C) {
      return function(F) {
        var traverseF = T.traverse(F);
        return function(wa, f) {
          return F.map(traverseF(wa, f), C.separate);
        };
      };
    }
    exports.wiltDefault = wiltDefault;
    function witherDefault(T, C) {
      return function(F) {
        var traverseF = T.traverse(F);
        return function(wa, f) {
          return F.map(traverseF(wa, f), C.compact);
        };
      };
    }
    exports.witherDefault = witherDefault;
    function filterE(W) {
      return function(F) {
        var witherF = W.wither(F);
        return function(predicate) {
          return function(ga) {
            return witherF(ga, function(a) {
              return F.map(predicate(a), function(b) {
                return b ? _.some(a) : _.none;
              });
            });
          };
        };
      };
    }
    exports.filterE = filterE;
  }
});

// node_modules/fp-ts/lib/Either.js
var require_Either = __commonJS({
  "node_modules/fp-ts/lib/Either.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fold = exports.match = exports.foldW = exports.matchW = exports.isRight = exports.isLeft = exports.fromOption = exports.fromPredicate = exports.FromEither = exports.MonadThrow = exports.throwError = exports.ChainRec = exports.Extend = exports.extend = exports.Alt = exports.alt = exports.altW = exports.Bifunctor = exports.mapLeft = exports.bimap = exports.Traversable = exports.sequence = exports.traverse = exports.Foldable = exports.reduceRight = exports.foldMap = exports.reduce = exports.Monad = exports.Chain = exports.chain = exports.chainW = exports.Applicative = exports.Apply = exports.ap = exports.apW = exports.Pointed = exports.of = exports.Functor = exports.map = exports.getAltValidation = exports.getApplicativeValidation = exports.getWitherable = exports.getFilterable = exports.getCompactable = exports.getSemigroup = exports.getEq = exports.getShow = exports.URI = exports.right = exports.left = void 0;
    exports.getValidation = exports.getValidationMonoid = exports.getValidationSemigroup = exports.getApplyMonoid = exports.getApplySemigroup = exports.either = exports.stringifyJSON = exports.parseJSON = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apSW = exports.apS = exports.bindW = exports.bind = exports.bindTo = exports.Do = exports.exists = exports.elem = exports.toError = exports.toUnion = exports.chainNullableK = exports.fromNullableK = exports.tryCatchK = exports.tryCatch = exports.fromNullable = exports.orElse = exports.orElseW = exports.swap = exports.filterOrElseW = exports.filterOrElse = exports.chainOptionK = exports.fromOptionK = exports.duplicate = exports.flatten = exports.flattenW = exports.chainFirstW = exports.chainFirst = exports.apSecond = exports.apFirst = exports.flap = exports.getOrElse = exports.getOrElseW = void 0;
    var Applicative_1 = require_Applicative();
    var Apply_1 = require_Apply();
    var Chain_1 = require_Chain();
    var ChainRec_1 = require_ChainRec();
    var FromEither_1 = require_FromEither();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var _ = __importStar(require_internal());
    var Separated_1 = require_Separated();
    var Witherable_1 = require_Witherable();
    exports.left = _.left;
    exports.right = _.right;
    var _map = function(fa, f) {
      return function_1.pipe(fa, exports.map(f));
    };
    var _ap = function(fab, fa) {
      return function_1.pipe(fab, exports.ap(fa));
    };
    var _chain = function(ma, f) {
      return function_1.pipe(ma, exports.chain(f));
    };
    var _reduce = function(fa, b, f) {
      return function_1.pipe(fa, exports.reduce(b, f));
    };
    var _foldMap = function(M) {
      return function(fa, f) {
        var foldMapM = exports.foldMap(M);
        return function_1.pipe(fa, foldMapM(f));
      };
    };
    var _reduceRight = function(fa, b, f) {
      return function_1.pipe(fa, exports.reduceRight(b, f));
    };
    var _traverse = function(F) {
      var traverseF = exports.traverse(F);
      return function(ta, f) {
        return function_1.pipe(ta, traverseF(f));
      };
    };
    var _bimap = function(fa, f, g) {
      return function_1.pipe(fa, exports.bimap(f, g));
    };
    var _mapLeft = function(fa, f) {
      return function_1.pipe(fa, exports.mapLeft(f));
    };
    var _alt = function(fa, that) {
      return function_1.pipe(fa, exports.alt(that));
    };
    var _extend = function(wa, f) {
      return function_1.pipe(wa, exports.extend(f));
    };
    var _chainRec = function(a, f) {
      return ChainRec_1.tailRec(f(a), function(e) {
        return exports.isLeft(e) ? exports.right(exports.left(e.left)) : exports.isLeft(e.right) ? exports.left(f(e.right.left)) : exports.right(exports.right(e.right.right));
      });
    };
    exports.URI = "Either";
    var getShow = function(SE, SA) {
      return {
        show: function(ma) {
          return exports.isLeft(ma) ? "left(" + SE.show(ma.left) + ")" : "right(" + SA.show(ma.right) + ")";
        }
      };
    };
    exports.getShow = getShow;
    var getEq = function(EL, EA) {
      return {
        equals: function(x, y) {
          return x === y || (exports.isLeft(x) ? exports.isLeft(y) && EL.equals(x.left, y.left) : exports.isRight(y) && EA.equals(x.right, y.right));
        }
      };
    };
    exports.getEq = getEq;
    var getSemigroup = function(S) {
      return {
        concat: function(x, y) {
          return exports.isLeft(y) ? x : exports.isLeft(x) ? y : exports.right(S.concat(x.right, y.right));
        }
      };
    };
    exports.getSemigroup = getSemigroup;
    var getCompactable = function(M) {
      var empty = exports.left(M.empty);
      return {
        URI: exports.URI,
        _E: void 0,
        compact: function(ma) {
          return exports.isLeft(ma) ? ma : ma.right._tag === "None" ? empty : exports.right(ma.right.value);
        },
        separate: function(ma) {
          return exports.isLeft(ma) ? Separated_1.separated(ma, ma) : exports.isLeft(ma.right) ? Separated_1.separated(exports.right(ma.right.left), empty) : Separated_1.separated(empty, exports.right(ma.right.right));
        }
      };
    };
    exports.getCompactable = getCompactable;
    var getFilterable = function(M) {
      var empty = exports.left(M.empty);
      var _a = exports.getCompactable(M), compact = _a.compact, separate = _a.separate;
      var filter = function(ma, predicate) {
        return exports.isLeft(ma) ? ma : predicate(ma.right) ? ma : empty;
      };
      var partition = function(ma, p) {
        return exports.isLeft(ma) ? Separated_1.separated(ma, ma) : p(ma.right) ? Separated_1.separated(empty, exports.right(ma.right)) : Separated_1.separated(exports.right(ma.right), empty);
      };
      return {
        URI: exports.URI,
        _E: void 0,
        map: _map,
        compact,
        separate,
        filter,
        filterMap: function(ma, f) {
          if (exports.isLeft(ma)) {
            return ma;
          }
          var ob = f(ma.right);
          return ob._tag === "None" ? empty : exports.right(ob.value);
        },
        partition,
        partitionMap: function(ma, f) {
          if (exports.isLeft(ma)) {
            return Separated_1.separated(ma, ma);
          }
          var e = f(ma.right);
          return exports.isLeft(e) ? Separated_1.separated(exports.right(e.left), empty) : Separated_1.separated(empty, exports.right(e.right));
        }
      };
    };
    exports.getFilterable = getFilterable;
    var getWitherable = function(M) {
      var F_ = exports.getFilterable(M);
      var C = exports.getCompactable(M);
      return {
        URI: exports.URI,
        _E: void 0,
        map: _map,
        compact: F_.compact,
        separate: F_.separate,
        filter: F_.filter,
        filterMap: F_.filterMap,
        partition: F_.partition,
        partitionMap: F_.partitionMap,
        traverse: _traverse,
        sequence: exports.sequence,
        reduce: _reduce,
        foldMap: _foldMap,
        reduceRight: _reduceRight,
        wither: Witherable_1.witherDefault(exports.Traversable, C),
        wilt: Witherable_1.wiltDefault(exports.Traversable, C)
      };
    };
    exports.getWitherable = getWitherable;
    var getApplicativeValidation = function(SE) {
      return {
        URI: exports.URI,
        _E: void 0,
        map: _map,
        ap: function(fab, fa) {
          return exports.isLeft(fab) ? exports.isLeft(fa) ? exports.left(SE.concat(fab.left, fa.left)) : fab : exports.isLeft(fa) ? fa : exports.right(fab.right(fa.right));
        },
        of: exports.of
      };
    };
    exports.getApplicativeValidation = getApplicativeValidation;
    var getAltValidation = function(SE) {
      return {
        URI: exports.URI,
        _E: void 0,
        map: _map,
        alt: function(me, that) {
          if (exports.isRight(me)) {
            return me;
          }
          var ea = that();
          return exports.isLeft(ea) ? exports.left(SE.concat(me.left, ea.left)) : ea;
        }
      };
    };
    exports.getAltValidation = getAltValidation;
    var map = function(f) {
      return function(fa) {
        return exports.isLeft(fa) ? fa : exports.right(f(fa.right));
      };
    };
    exports.map = map;
    exports.Functor = {
      URI: exports.URI,
      map: _map
    };
    exports.of = exports.right;
    exports.Pointed = {
      URI: exports.URI,
      of: exports.of
    };
    var apW = function(fa) {
      return function(fab) {
        return exports.isLeft(fab) ? fab : exports.isLeft(fa) ? fa : exports.right(fab.right(fa.right));
      };
    };
    exports.apW = apW;
    exports.ap = exports.apW;
    exports.Apply = {
      URI: exports.URI,
      map: _map,
      ap: _ap
    };
    exports.Applicative = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      of: exports.of
    };
    var chainW = function(f) {
      return function(ma) {
        return exports.isLeft(ma) ? ma : f(ma.right);
      };
    };
    exports.chainW = chainW;
    exports.chain = exports.chainW;
    exports.Chain = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      chain: _chain
    };
    exports.Monad = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      of: exports.of,
      chain: _chain
    };
    var reduce = function(b, f) {
      return function(fa) {
        return exports.isLeft(fa) ? b : f(b, fa.right);
      };
    };
    exports.reduce = reduce;
    var foldMap = function(M) {
      return function(f) {
        return function(fa) {
          return exports.isLeft(fa) ? M.empty : f(fa.right);
        };
      };
    };
    exports.foldMap = foldMap;
    var reduceRight = function(b, f) {
      return function(fa) {
        return exports.isLeft(fa) ? b : f(fa.right, b);
      };
    };
    exports.reduceRight = reduceRight;
    exports.Foldable = {
      URI: exports.URI,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight
    };
    var traverse = function(F) {
      return function(f) {
        return function(ta) {
          return exports.isLeft(ta) ? F.of(exports.left(ta.left)) : F.map(f(ta.right), exports.right);
        };
      };
    };
    exports.traverse = traverse;
    var sequence = function(F) {
      return function(ma) {
        return exports.isLeft(ma) ? F.of(exports.left(ma.left)) : F.map(ma.right, exports.right);
      };
    };
    exports.sequence = sequence;
    exports.Traversable = {
      URI: exports.URI,
      map: _map,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence
    };
    var bimap = function(f, g) {
      return function(fa) {
        return exports.isLeft(fa) ? exports.left(f(fa.left)) : exports.right(g(fa.right));
      };
    };
    exports.bimap = bimap;
    var mapLeft = function(f) {
      return function(fa) {
        return exports.isLeft(fa) ? exports.left(f(fa.left)) : fa;
      };
    };
    exports.mapLeft = mapLeft;
    exports.Bifunctor = {
      URI: exports.URI,
      bimap: _bimap,
      mapLeft: _mapLeft
    };
    var altW = function(that) {
      return function(fa) {
        return exports.isLeft(fa) ? that() : fa;
      };
    };
    exports.altW = altW;
    exports.alt = exports.altW;
    exports.Alt = {
      URI: exports.URI,
      map: _map,
      alt: _alt
    };
    var extend = function(f) {
      return function(wa) {
        return exports.isLeft(wa) ? wa : exports.right(f(wa));
      };
    };
    exports.extend = extend;
    exports.Extend = {
      URI: exports.URI,
      map: _map,
      extend: _extend
    };
    exports.ChainRec = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      chain: _chain,
      chainRec: _chainRec
    };
    exports.throwError = exports.left;
    exports.MonadThrow = {
      URI: exports.URI,
      map: _map,
      ap: _ap,
      of: exports.of,
      chain: _chain,
      throwError: exports.throwError
    };
    exports.FromEither = {
      URI: exports.URI,
      fromEither: function_1.identity
    };
    exports.fromPredicate = /* @__PURE__ */ FromEither_1.fromPredicate(exports.FromEither);
    exports.fromOption = /* @__PURE__ */ FromEither_1.fromOption(exports.FromEither);
    exports.isLeft = _.isLeft;
    exports.isRight = _.isRight;
    var matchW = function(onLeft, onRight) {
      return function(ma) {
        return exports.isLeft(ma) ? onLeft(ma.left) : onRight(ma.right);
      };
    };
    exports.matchW = matchW;
    exports.foldW = exports.matchW;
    exports.match = exports.matchW;
    exports.fold = exports.match;
    var getOrElseW = function(onLeft) {
      return function(ma) {
        return exports.isLeft(ma) ? onLeft(ma.left) : ma.right;
      };
    };
    exports.getOrElseW = getOrElseW;
    exports.getOrElse = exports.getOrElseW;
    exports.flap = /* @__PURE__ */ Functor_1.flap(exports.Functor);
    exports.apFirst = /* @__PURE__ */ Apply_1.apFirst(exports.Apply);
    exports.apSecond = /* @__PURE__ */ Apply_1.apSecond(exports.Apply);
    exports.chainFirst = /* @__PURE__ */ Chain_1.chainFirst(exports.Chain);
    exports.chainFirstW = exports.chainFirst;
    exports.flattenW = /* @__PURE__ */ exports.chainW(function_1.identity);
    exports.flatten = exports.flattenW;
    exports.duplicate = /* @__PURE__ */ exports.extend(function_1.identity);
    exports.fromOptionK = /* @__PURE__ */ FromEither_1.fromOptionK(exports.FromEither);
    exports.chainOptionK = /* @__PURE__ */ FromEither_1.chainOptionK(exports.FromEither, exports.Chain);
    exports.filterOrElse = /* @__PURE__ */ FromEither_1.filterOrElse(exports.FromEither, exports.Chain);
    exports.filterOrElseW = exports.filterOrElse;
    var swap = function(ma) {
      return exports.isLeft(ma) ? exports.right(ma.left) : exports.left(ma.right);
    };
    exports.swap = swap;
    var orElseW = function(onLeft) {
      return function(ma) {
        return exports.isLeft(ma) ? onLeft(ma.left) : ma;
      };
    };
    exports.orElseW = orElseW;
    exports.orElse = exports.orElseW;
    var fromNullable = function(e) {
      return function(a) {
        return a == null ? exports.left(e) : exports.right(a);
      };
    };
    exports.fromNullable = fromNullable;
    var tryCatch = function(f, onThrow) {
      try {
        return exports.right(f());
      } catch (e) {
        return exports.left(onThrow(e));
      }
    };
    exports.tryCatch = tryCatch;
    var tryCatchK = function(f, onThrow) {
      return function() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          a[_i] = arguments[_i];
        }
        return exports.tryCatch(function() {
          return f.apply(void 0, a);
        }, onThrow);
      };
    };
    exports.tryCatchK = tryCatchK;
    var fromNullableK = function(e) {
      var from = exports.fromNullable(e);
      return function(f) {
        return function_1.flow(f, from);
      };
    };
    exports.fromNullableK = fromNullableK;
    var chainNullableK = function(e) {
      var from = exports.fromNullableK(e);
      return function(f) {
        return exports.chain(from(f));
      };
    };
    exports.chainNullableK = chainNullableK;
    exports.toUnion = /* @__PURE__ */ exports.foldW(function_1.identity, function_1.identity);
    function toError(e) {
      return e instanceof Error ? e : new Error(String(e));
    }
    exports.toError = toError;
    function elem(E) {
      return function(a, ma) {
        if (ma === void 0) {
          var elemE_1 = elem(E);
          return function(ma2) {
            return elemE_1(a, ma2);
          };
        }
        return exports.isLeft(ma) ? false : E.equals(a, ma.right);
      };
    }
    exports.elem = elem;
    var exists = function(predicate) {
      return function(ma) {
        return exports.isLeft(ma) ? false : predicate(ma.right);
      };
    };
    exports.exists = exists;
    exports.Do = /* @__PURE__ */ exports.of(_.emptyRecord);
    exports.bindTo = /* @__PURE__ */ Functor_1.bindTo(exports.Functor);
    exports.bind = /* @__PURE__ */ Chain_1.bind(exports.Chain);
    exports.bindW = exports.bind;
    exports.apS = /* @__PURE__ */ Apply_1.apS(exports.Apply);
    exports.apSW = exports.apS;
    exports.ApT = /* @__PURE__ */ exports.of(_.emptyReadonlyArray);
    var traverseReadonlyNonEmptyArrayWithIndex = function(f) {
      return function(as) {
        var e = f(0, _.head(as));
        if (exports.isLeft(e)) {
          return e;
        }
        var out = [e.right];
        for (var i = 1; i < as.length; i++) {
          var e_1 = f(i, as[i]);
          if (exports.isLeft(e_1)) {
            return e_1;
          }
          out.push(e_1.right);
        }
        return exports.right(out);
      };
    };
    exports.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
    var traverseReadonlyArrayWithIndex = function(f) {
      var g = exports.traverseReadonlyNonEmptyArrayWithIndex(f);
      return function(as) {
        return _.isNonEmpty(as) ? g(as) : exports.ApT;
      };
    };
    exports.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex;
    exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex;
    var traverseArray = function(f) {
      return exports.traverseReadonlyArrayWithIndex(function(_2, a) {
        return f(a);
      });
    };
    exports.traverseArray = traverseArray;
    exports.sequenceArray = /* @__PURE__ */ exports.traverseArray(function_1.identity);
    function parseJSON(s, onError) {
      return exports.tryCatch(function() {
        return JSON.parse(s);
      }, onError);
    }
    exports.parseJSON = parseJSON;
    var stringifyJSON = function(u, onError) {
      return exports.tryCatch(function() {
        var s = JSON.stringify(u);
        if (typeof s !== "string") {
          throw new Error("Converting unsupported structure to JSON");
        }
        return s;
      }, onError);
    };
    exports.stringifyJSON = stringifyJSON;
    exports.either = {
      URI: exports.URI,
      map: _map,
      of: exports.of,
      ap: _ap,
      chain: _chain,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence,
      bimap: _bimap,
      mapLeft: _mapLeft,
      alt: _alt,
      extend: _extend,
      chainRec: _chainRec,
      throwError: exports.throwError
    };
    exports.getApplySemigroup = /* @__PURE__ */ Apply_1.getApplySemigroup(exports.Apply);
    exports.getApplyMonoid = /* @__PURE__ */ Applicative_1.getApplicativeMonoid(exports.Applicative);
    var getValidationSemigroup = function(SE, SA) {
      return Apply_1.getApplySemigroup(exports.getApplicativeValidation(SE))(SA);
    };
    exports.getValidationSemigroup = getValidationSemigroup;
    var getValidationMonoid = function(SE, MA) {
      return Applicative_1.getApplicativeMonoid(exports.getApplicativeValidation(SE))(MA);
    };
    exports.getValidationMonoid = getValidationMonoid;
    function getValidation(SE) {
      var ap = exports.getApplicativeValidation(SE).ap;
      var alt = exports.getAltValidation(SE).alt;
      return {
        URI: exports.URI,
        _E: void 0,
        map: _map,
        of: exports.of,
        chain: _chain,
        bimap: _bimap,
        mapLeft: _mapLeft,
        reduce: _reduce,
        foldMap: _foldMap,
        reduceRight: _reduceRight,
        extend: _extend,
        traverse: _traverse,
        sequence: exports.sequence,
        chainRec: _chainRec,
        throwError: exports.throwError,
        ap,
        alt
      };
    }
    exports.getValidation = getValidation;
  }
});

// my_functions/encrypt.ts
__export(exports, {
  handler: () => handler
});
var import_Either = __toModule(require_Either());
var import_function = __toModule(require_function());

// my_functions/http.ts
var DEFAULT_HEADERS = {
  "Content-Type": "application/json"
};
var StatusCodes = class {
};
__publicField(StatusCodes, "OK", 200);
__publicField(StatusCodes, "CREATED", 201);
__publicField(StatusCodes, "BAD_REQUEST", 400);
__publicField(StatusCodes, "SERVER_ERROR", 500);
var ApplicationError = class {
  constructor(message, errors, status) {
    __publicField(this, "message");
    __publicField(this, "errors");
    __publicField(this, "statusCode");
    this.message = message;
    this.errors = errors;
    this.statusCode = status;
  }
};
var successResponse = (statusCode, result) => ({
  statusCode,
  headers: DEFAULT_HEADERS,
  body: JSON.stringify(result)
});
var errorResponse = (error) => ({
  statusCode: error.statusCode,
  headers: DEFAULT_HEADERS,
  body: JSON.stringify({ message: error.message, errors: error.errors })
});

// my_functions/encrypt.ts
var import_Either2 = __toModule(require_Either());

// my_functions/helpers.ts
var import_crypto = __toModule(require("crypto"));
var fastModularExponentiation = (b, e, m) => {
  if (BigInt(e) == BigInt(0))
    return BigInt(1);
  var t = BigInt(BigInt(e) & BigInt(1)) == BigInt(1) ? BigInt(BigInt(b) % BigInt(m)) : BigInt(1);
  return BigInt(t * fastModularExponentiation(BigInt(BigInt(b) * BigInt(b) % BigInt(m)), BigInt(BigInt(e) >> BigInt(1)), BigInt(m)) % BigInt(m));
};
var bytesToLong = (event) => {
  if (event.length == 0)
    return 0;
  return BigInt((BigInt(bytesToLong(event.slice(0, -1))) << BigInt(8)) + BigInt(event.slice(-1).charCodeAt(0)));
};
var extendedEuclideanAlgorithm = (a, b) => {
  if (BigInt(a) == BigInt(0))
    return [BigInt(b), BigInt(0), BigInt(1)];
  var [x, y, z] = extendedEuclideanAlgorithm(BigInt(b % a), BigInt(a));
  return [BigInt(x), BigInt(z - b / a * y), BigInt(y)];
};
var inverseModulo = (a, n) => {
  var [g, res, dummy] = extendedEuclideanAlgorithm(BigInt(a), BigInt(n));
  if (g != BigInt(1))
    throw "Inverse Modulo does not exist";
  if (BigInt(res) < 0)
    return BigInt(BigInt(res) + BigInt(n));
  return BigInt(res);
};

// node_modules/bigint-crypto-utils/dist/esm/index.node.js
var index_node = {};
Object.defineProperty(index_node, "__esModule", { value: true });
function abs(a) {
  return a >= 0 ? a : -a;
}
function bitLength(a) {
  if (typeof a === "number")
    a = BigInt(a);
  if (a === 1n) {
    return 1;
  }
  let bits = 1;
  do {
    bits++;
  } while ((a >>= 1n) > 1n);
  return bits;
}
function eGcd(a, b) {
  if (typeof a === "number")
    a = BigInt(a);
  if (typeof b === "number")
    b = BigInt(b);
  if (a <= 0n || b <= 0n)
    throw new RangeError("a and b MUST be > 0");
  let x = 0n;
  let y = 1n;
  let u = 1n;
  let v = 0n;
  while (a !== 0n) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    const n = y - v * q;
    b = a;
    a = r;
    x = u;
    y = v;
    u = m;
    v = n;
  }
  return {
    g: b,
    x,
    y
  };
}
function gcd(a, b) {
  let aAbs = typeof a === "number" ? BigInt(abs(a)) : abs(a);
  let bAbs = typeof b === "number" ? BigInt(abs(b)) : abs(b);
  if (aAbs === 0n) {
    return bAbs;
  } else if (bAbs === 0n) {
    return aAbs;
  }
  let shift = 0n;
  while (((aAbs | bAbs) & 1n) === 0n) {
    aAbs >>= 1n;
    bAbs >>= 1n;
    shift++;
  }
  while ((aAbs & 1n) === 0n)
    aAbs >>= 1n;
  do {
    while ((bAbs & 1n) === 0n)
      bAbs >>= 1n;
    if (aAbs > bAbs) {
      const x = aAbs;
      aAbs = bAbs;
      bAbs = x;
    }
    bAbs -= aAbs;
  } while (bAbs !== 0n);
  return aAbs << shift;
}
function lcm(a, b) {
  if (typeof a === "number")
    a = BigInt(a);
  if (typeof b === "number")
    b = BigInt(b);
  if (a === 0n && b === 0n)
    return BigInt(0);
  return abs(a * b) / gcd(a, b);
}
function max(a, b) {
  return a >= b ? a : b;
}
function min(a, b) {
  return a >= b ? b : a;
}
function toZn(a, n) {
  if (typeof a === "number")
    a = BigInt(a);
  if (typeof n === "number")
    n = BigInt(n);
  if (n <= 0n) {
    throw new RangeError("n must be > 0");
  }
  const aZn = a % n;
  return aZn < 0n ? aZn + n : aZn;
}
function modInv(a, n) {
  const egcd = eGcd(toZn(a, n), n);
  if (egcd.g !== 1n) {
    throw new RangeError(`${a.toString()} does not have inverse modulo ${n.toString()}`);
  } else {
    return toZn(egcd.x, n);
  }
}
function modPow(b, e, n) {
  if (typeof b === "number")
    b = BigInt(b);
  if (typeof e === "number")
    e = BigInt(e);
  if (typeof n === "number")
    n = BigInt(n);
  if (n <= 0n) {
    throw new RangeError("n must be > 0");
  } else if (n === 1n) {
    return 0n;
  }
  b = toZn(b, n);
  if (e < 0n) {
    return modInv(modPow(b, abs(e), n), n);
  }
  let r = 1n;
  while (e > 0) {
    if (e % 2n === 1n) {
      r = r * b % n;
    }
    e = e / 2n;
    b = b ** 2n % n;
  }
  return r;
}
var abs_1 = index_node.abs = abs;
var bitLength_1 = index_node.bitLength = bitLength;
var eGcd_1 = index_node.eGcd = eGcd;
var gcd_1 = index_node.gcd = gcd;
var lcm_1 = index_node.lcm = lcm;
var max_1 = index_node.max = max;
var min_1 = index_node.min = min;
var modInv_1 = index_node.modInv = modInv;
var modPow_1 = index_node.modPow = modPow;
var toZn_1 = index_node.toZn = toZn;
function fromBuffer(buf) {
  let ret = 0n;
  for (const i of buf.values()) {
    const bi = BigInt(i);
    ret = (ret << 8n) + bi;
  }
  return ret;
}
function randBytesSync(byteLength, forceLength = false) {
  if (byteLength < 1)
    throw new RangeError("byteLength MUST be > 0");
  {
    const crypto = require("crypto");
    const buf = crypto.randomBytes(byteLength);
    if (forceLength)
      buf[0] = buf[0] | 128;
    return buf;
  }
}
function randBitsSync(bitLength2, forceLength = false) {
  if (bitLength2 < 1)
    throw new RangeError("bitLength MUST be > 0");
  const byteLength = Math.ceil(bitLength2 / 8);
  const rndBytes = randBytesSync(byteLength, false);
  const bitLengthMod8 = bitLength2 % 8;
  if (bitLengthMod8 !== 0) {
    rndBytes[0] = rndBytes[0] & 2 ** bitLengthMod8 - 1;
  }
  if (forceLength) {
    const mask = bitLengthMod8 !== 0 ? 2 ** (bitLengthMod8 - 1) : 128;
    rndBytes[0] = rndBytes[0] | mask;
  }
  return rndBytes;
}
function randBetween(max2, min2 = 1n) {
  if (max2 <= 0n || min2 < 0n || max2 <= min2)
    throw new RangeError("Arguments MUST be: max > 0 && min >=0 && max > min");
  const interval = max2 - min2;
  const bitLen = bitLength_1(interval);
  let rnd;
  do {
    const buf = randBitsSync(bitLen);
    rnd = fromBuffer(buf);
  } while (rnd > interval);
  return rnd + min2;
}
var _useWorkers = false;
{
  try {
    require.resolve("worker_threads");
    _useWorkers = true;
  } catch (e) {
    console.log(`[bigint-crypto-utils] WARNING:
This node version doesn't support worker_threads. You should enable them in order to greatly speedup the generation of big prime numbers.
  \xB7 With Node >=11 it is enabled by default (consider upgrading).
  \xB7 With Node 10, starting with 10.5.0, you can enable worker_threads at runtime executing node --experimental-worker `);
  }
}
function _isProbablyPrime(w, iterations) {
  if (w === 2n)
    return true;
  else if ((w & 1n) === 0n || w === 1n)
    return false;
  const firstPrimes = [
    3n,
    5n,
    7n,
    11n,
    13n,
    17n,
    19n,
    23n,
    29n,
    31n,
    37n,
    41n,
    43n,
    47n,
    53n,
    59n,
    61n,
    67n,
    71n,
    73n,
    79n,
    83n,
    89n,
    97n,
    101n,
    103n,
    107n,
    109n,
    113n,
    127n,
    131n,
    137n,
    139n,
    149n,
    151n,
    157n,
    163n,
    167n,
    173n,
    179n,
    181n,
    191n,
    193n,
    197n,
    199n,
    211n,
    223n,
    227n,
    229n,
    233n,
    239n,
    241n,
    251n,
    257n,
    263n,
    269n,
    271n,
    277n,
    281n,
    283n,
    293n,
    307n,
    311n,
    313n,
    317n,
    331n,
    337n,
    347n,
    349n,
    353n,
    359n,
    367n,
    373n,
    379n,
    383n,
    389n,
    397n,
    401n,
    409n,
    419n,
    421n,
    431n,
    433n,
    439n,
    443n,
    449n,
    457n,
    461n,
    463n,
    467n,
    479n,
    487n,
    491n,
    499n,
    503n,
    509n,
    521n,
    523n,
    541n,
    547n,
    557n,
    563n,
    569n,
    571n,
    577n,
    587n,
    593n,
    599n,
    601n,
    607n,
    613n,
    617n,
    619n,
    631n,
    641n,
    643n,
    647n,
    653n,
    659n,
    661n,
    673n,
    677n,
    683n,
    691n,
    701n,
    709n,
    719n,
    727n,
    733n,
    739n,
    743n,
    751n,
    757n,
    761n,
    769n,
    773n,
    787n,
    797n,
    809n,
    811n,
    821n,
    823n,
    827n,
    829n,
    839n,
    853n,
    857n,
    859n,
    863n,
    877n,
    881n,
    883n,
    887n,
    907n,
    911n,
    919n,
    929n,
    937n,
    941n,
    947n,
    953n,
    967n,
    971n,
    977n,
    983n,
    991n,
    997n,
    1009n,
    1013n,
    1019n,
    1021n,
    1031n,
    1033n,
    1039n,
    1049n,
    1051n,
    1061n,
    1063n,
    1069n,
    1087n,
    1091n,
    1093n,
    1097n,
    1103n,
    1109n,
    1117n,
    1123n,
    1129n,
    1151n,
    1153n,
    1163n,
    1171n,
    1181n,
    1187n,
    1193n,
    1201n,
    1213n,
    1217n,
    1223n,
    1229n,
    1231n,
    1237n,
    1249n,
    1259n,
    1277n,
    1279n,
    1283n,
    1289n,
    1291n,
    1297n,
    1301n,
    1303n,
    1307n,
    1319n,
    1321n,
    1327n,
    1361n,
    1367n,
    1373n,
    1381n,
    1399n,
    1409n,
    1423n,
    1427n,
    1429n,
    1433n,
    1439n,
    1447n,
    1451n,
    1453n,
    1459n,
    1471n,
    1481n,
    1483n,
    1487n,
    1489n,
    1493n,
    1499n,
    1511n,
    1523n,
    1531n,
    1543n,
    1549n,
    1553n,
    1559n,
    1567n,
    1571n,
    1579n,
    1583n,
    1597n
  ];
  for (let i = 0; i < firstPrimes.length && firstPrimes[i] <= w; i++) {
    const p = firstPrimes[i];
    if (w === p)
      return true;
    else if (w % p === 0n)
      return false;
  }
  let a = 0n;
  const d = w - 1n;
  let aux = d;
  while (aux % 2n === 0n) {
    aux /= 2n;
    ++a;
  }
  const m = d / 2n ** a;
  do {
    const b = randBetween(d, 2n);
    let z = modPow_1(b, m, w);
    if (z === 1n || z === d)
      continue;
    let j = 1;
    while (j < a) {
      z = modPow_1(z, 2n, w);
      if (z === d)
        break;
      if (z === 1n)
        return false;
      j++;
    }
    if (z !== d)
      return false;
  } while (--iterations !== 0);
  return true;
}
if (_useWorkers) {
  const { parentPort, isMainThread } = require("worker_threads");
  const isWorker = !isMainThread;
  if (isWorker) {
    parentPort.on("message", function(data) {
      const isPrime = _isProbablyPrime(data.rnd, data.iterations);
      const msg = {
        isPrime,
        value: data.rnd,
        id: data.id
      };
      parentPort.postMessage(msg);
    });
  }
}
function primeSync(bitLength2, iterations = 16) {
  if (bitLength2 < 1)
    throw new RangeError("bitLength MUST be > 0");
  let rnd = 0n;
  do {
    rnd = fromBuffer(randBitsSync(bitLength2, true));
  } while (!_isProbablyPrime(rnd, iterations));
  return rnd;
}

// my_functions/encrypt.ts
var paramsNotNull = (event) => {
  if (event.queryStringParameters.m == null) {
    return (0, import_Either2.left)(new ApplicationError("Error parsing query parameters", ["Query params should not be empty"], StatusCodes.BAD_REQUEST));
  }
  return (0, import_Either2.right)(event);
};
var validateEncryptionParameters = (event) => {
  return (0, import_function.pipe)(paramsNotNull(event));
};
var calculatePublicKey = (event) => {
  return (0, import_Either2.right)(__spreadProps(__spreadValues({}, event), {
    n: (BigInt(event.p) * BigInt(event.q)).toString(),
    e: "65537"
  }));
};
var calculatePrivateKey = (event) => {
  try {
    return (0, import_Either2.right)(__spreadProps(__spreadValues({}, event), {
      d: inverseModulo(event.e, ((BigInt(event.p) - BigInt(1)) * (BigInt(event.q) - BigInt(1))).toString()).toString()
    }));
  } catch {
    return (0, import_Either2.left)(new ApplicationError("Error calculating modular inverse", ["Error calculating modular inverse"], StatusCodes.SERVER_ERROR));
  }
};
var calculateEncryptedMessage = (event) => {
  return (0, import_Either2.right)(__spreadProps(__spreadValues({}, event), {
    c: fastModularExponentiation(BigInt(event.m), BigInt(event.e), BigInt(event.n)).toString()
  }));
};
var encrypt = (event) => {
  var p = primeSync(512).toString();
  var q = primeSync(512).toString();
  return (0, import_function.pipe)(calculatePublicKey({ p, q, m: event.m }), (0, import_Either.chain)(calculatePrivateKey), (0, import_Either.chain)(calculateEncryptedMessage));
};
var convertAPIEventToEncryptParameters = (event) => {
  return (0, import_Either2.right)({
    m: bytesToLong(event.queryStringParameters.m).toString()
  });
};
async function handler(event, context) {
  return (0, import_function.pipe)(validateEncryptionParameters(event), (0, import_Either.chain)(convertAPIEventToEncryptParameters), (0, import_Either.chain)(encrypt), (0, import_Either.fold)((error) => errorResponse(error), (result) => successResponse(StatusCodes.OK, result)));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=encrypt.js.map
