export class WindowScrollingService {
  private styleTag: HTMLStyleElement;

  constructor() {
    this.styleTag = this.buildStyleElement();
  }

  disable() {
    document.body.appendChild( this.styleTag );
  }

  enable() {
      document.body.removeChild( this.styleTag );
  }

  private buildStyleElement(): HTMLStyleElement {

      const style = document.createElement('style');

      style.textContent = `
          body {
              overflow: hidden !important ;
          }
      `;

      return( style );
  }
}
