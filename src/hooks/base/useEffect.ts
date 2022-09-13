let activeEffect: any = undefined;
class ReactiveEffect {
    active = true;
    deps = [];
    constructor(fn: any) {
        (this as any).fn = fn
    }
    run() {
        if(!this.active) {(this as any).fn()};
        try {
            activeEffect = this;
            return (this as any).fn()
        } finally {
            activeEffect = undefined;
        }
    }
}

export default (fn: any) => {
    const _effect = new ReactiveEffect(fn);
    _effect.run()
}
