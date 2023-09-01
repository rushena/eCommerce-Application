import '.././../assets/css/profile.page.css'

export class ProfilePageView {
    private $main: HTMLElement = document.createElement('div');

    setPageStructure() {
        const $mainInner = document.createElement('div');
        $mainInner.classList.add('profile-page');
        this.$main.append($mainInner);
    }


    getElement() {
        this.setPageStructure();
        return this.$main;
    }
}