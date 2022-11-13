// animate pages and controls
const pageTransition = () => {
  // button click to active class
  [ ...document.querySelectorAll('.control') ].forEach(control => {
    control.addEventListener('click', () => {
      // remove active-btn class from all controlls
      document.querySelectorAll('.active-btn').forEach(ctrl => {
        ctrl.classList.remove('active-btn');
      });
      // add active class to selected
      control.classList.add('active-btn');
      document.querySelector('.active').classList.remove('active');
      document.getElementById(control.dataset.id).classList.add('active');
    });
  });

  // toggle theme
  document.querySelector('.theme-btn').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });
};
// call main function
pageTransition();
