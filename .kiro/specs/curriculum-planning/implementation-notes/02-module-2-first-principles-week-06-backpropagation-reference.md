# Reference Behavior: Module 2 Phase 6 Training Versus Inference

Scaffold: `curriculum/02-module-2-first-principles/week-06-backpropagation/workbench.py`

## Intent

This lesson should give learners a toy-scale distinction between inference, loss, gradient updates, training epochs, and adaptation decisions.

## Intended Behavior

- Predict with a simple weight and bias model.
- Compute mean squared error across examples.
- Return updated model parameters from a gradient step without mutating inputs.
- Train one epoch in order and show reduced simple error.
- Build inference traces that preserve model state.
- Recommend adaptation paths without treating fine-tuning as the default first fix.

## Reviewer Edge Cases

- Empty examples should be handled according to the workbench contract.
- Updates should return new `LinearModel` instances.
- Recommendation text should mention cheaper alternatives when appropriate.

## Do Not Accept

- Hidden mutation of the input model in inference.
- Full neural-network frameworks.
- Fine-tuning recommendations without data, cost, and maintenance reasoning.
