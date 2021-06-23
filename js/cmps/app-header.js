export default {
    template: `
    <header class="app-header">
      <div class="logo">
      <h1>App Sus</h1>
      </div>
      <nav>
            <router-link to="/" >Home</router-link> |
            <router-link to="/mail" >Mail</router-link> |
            <router-link to="/keep" >Keep</router-link> 
        </nav>
    </header>
    `,
};