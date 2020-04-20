
class LeverAction {

    static componentId = 'lever-action';

    static register = (callback) => {
        console.log('register lever-action');
        AFRAME.registerComponent(this.componentId, {
            init: function () {
                let el = this.el;
                console.log('init lever-action');
                this.el.addEventListener('click', function (evt) {
                    console.log('lever actioned!!!');
                    callback();
                });
            }
        });
    }

}

export { LeverAction }
