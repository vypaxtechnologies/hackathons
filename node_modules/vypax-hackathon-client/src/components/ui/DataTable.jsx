import cn from '../../utils/classNames'
import EmptyState from './EmptyState'
import { PageLoader } from './Loader'

/**
 * Responsive table used across the admin panel.
 *
 * The inner `overflow-x-auto` wrapper means wide tables scroll inside their
 * own container instead of pushing the page into horizontal overflow.
 */
export default function DataTable({
  columns = [],
  rows = [],
  getRowKey,
  isLoading = false,
  emptyTitle = 'No records found',
  emptyMessage,
  emptyIcon,
  caption,
  className
}) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-ink-900/50 p-10">
        <PageLoader label="Loading records" />
      </div>
    )
  }

  if (!rows.length) {
    return <EmptyState icon={emptyIcon} title={emptyTitle} message={emptyMessage} />
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/50',
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}

          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.02]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    'whitespace-nowrap px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-mist-400',
                    column.align === 'right' && 'text-right',
                    column.align === 'center' && 'text-center',
                    column.headerClassName
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.06]">
            {rows.map((row, index) => (
              <tr
                key={getRowKey ? getRowKey(row, index) : row._id || row.id || index}
                className="transition-colors hover:bg-white/[0.025]"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      'px-4 py-3.5 align-middle text-mist-300',
                      column.align === 'right' && 'text-right',
                      column.align === 'center' && 'text-center',
                      column.className
                    )}
                  >
                    {column.render ? column.render(row, index) : (row[column.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
