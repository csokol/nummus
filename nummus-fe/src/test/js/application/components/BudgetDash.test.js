import React from 'react';
import ReactDOM from 'react-dom';
import BudgetDash from '../../../../main/js/application/components/BudgetDash';
import CategoryRepository from "../../../../main/js/domain/CategoryRepository";
import TestRenderer from 'react-test-renderer';

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BudgetDash categoryRepository={new CategoryRepository()} />, div);
});

it('shows categories with empty budgets', () => {
  const div = document.createElement('div');
  const categoryRepository = new CategoryRepository();

  const testRenderer = TestRenderer.create(
    <BudgetDash categoryRepository={categoryRepository} />
  );
  const tableBodyRows = testRenderer.root.findByType('tbody').children;

  expect(tableBodyRows).toHaveLength(categoryRepository.list().length);
});

it('shows existing bugdets', () => {
  const div = document.createElement('div');
  const categoryRepository = new CategoryRepository();

  const testRenderer = TestRenderer.create(
    <BudgetDash categoryRepository={categoryRepository} />
  );
  const tableBodyRows = testRenderer.root.findByType('tbody').children;

  expect(tableBodyRows).toHaveLength(categoryRepository.list().length);
});

