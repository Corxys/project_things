export const updateFilling = (id) => {
  const steps = document.querySelectorAll('.registration__step');

  const selectedStep = document.querySelector(`#step-${id}`);
  selectedStep.classList.add('active');

  if (id >= 2) {
    const selectedStepLine = document.querySelector(`#line-${id - 1}`);
    selectedStepLine.classList.add('active');
  }

  const selectedStepNumber = selectedStep.querySelector('.registration__step-number');
  selectedStepNumber.classList.add('active');
  selectedStepNumber.classList.add('complete');

  steps.forEach((step) => {
    const stepId = parseInt(step.id[5], 10);
    const selectedStepId = parseInt(selectedStep.id[5], 10);

    if (stepId < selectedStepId) {
      const prevStepNumber = step.querySelector('.registration__step-number');
      prevStepNumber.classList.remove('active');
      prevStepNumber.classList.add('complete');
    } else if (stepId > selectedStepId) {
      const nextStepNumber = step.querySelector('.registration__step-number');
      nextStepNumber.classList.remove('active');
    }
  });
};
