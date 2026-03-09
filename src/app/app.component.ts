import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

interface ElementRow {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgForOf, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="app-shell">
      <header class="header">
        <h1>{{ title }}</h1>
        <button
          type="button"
          (click)="refresh()"
          class="refresh"
          aria-label="Refresh table"
        >
          Refresh
        </button>
      </header>

      <section class="content">
        <div class="table-wrapper" role="region" aria-label="Elements table">
          <table class="elements-table">
            <caption class="visually-hidden">List of elements</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Element</th>
              </tr>
            </thead>
            <tbody>
              <tr *@for="let element of elementsList()">
                <td>{{ element.id }}</td>
                <td>{{ element.name }}</td>
              </tr>
            </tbody>
          </table>

          <p *@if="elementsList().length === 0" class="empty">
            No elements found. Click refresh to load.
          </p>
        </div>
      </section>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        padding: 1.5rem;
        background: #f8fafc;
        color: #0f172a;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .header {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      h1 {
        margin: 0;
        font-size: 1.75rem;
        line-height: 1.2;
      }

      .refresh {
        padding: 0.6rem 1rem;
        border: 1px solid #94a3b8;
        background: #ffffff;
        border-radius: 0.35rem;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.15s ease-in-out, border-color 0.15s ease-in-out;
      }

      .refresh:hover {
        background: #f1f5f9;
      }

      .refresh:active {
        background: #e2e8f0;
      }

      .table-wrapper {
        width: 100%;
        overflow-x: auto;
      }

      .elements-table {
        width: 100%;
        border-collapse: collapse;
      }

      .elements-table th,
      .elements-table td {
        text-align: left;
        padding: 0.75rem;
        border: 1px solid #cbd5e1;
      }

      .elements-table th {
        background: #f1f5f9;
        font-weight: 600;
      }

      .empty {
        margin: 1.25rem 0 0;
        color: #64748b;
      }

      @media (max-width: 480px) {
        .header {
          flex-direction: column;
          align-items: stretch;
        }

        .refresh {
          width: 100%;
        }
      }

      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `
  ]
})
export class AppComponent {
  title = 'Element List';

  private nextId = 1;

  private elements = signal<ElementRow[]>([]);
  elementsList = computed(() => this.elements());

  constructor() {
    this.refresh();
  }

  refresh() {
    const sample = Array.from({ length: 5 }, () => this.createElement());
    this.elements.set(sample);
  }

  private createElement(): ElementRow {
    const element: ElementRow = {
      id: this.nextId++,
      name: `Element ${Math.floor(Math.random() * 100) + 1}`
    };

    return element;
  }
}
