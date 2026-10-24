import React, { useState } from 'react';

export default function AquaFolderWindow({
  folderId: _folderId,
  title: _title,
  items = [],
  viewMode = 'icon',
  onOpenItem,
  onOpenGame
}) {
  const [currentView, setCurrentView] = useState(viewMode);
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item => {
    const q = searchQuery.toLowerCase();
    const nameMatch = item?.name && item.name.toLowerCase().includes(q);
    const titleMatch = item?.title && item.title.toLowerCase().includes(q);
    return Boolean(nameMatch || titleMatch);
  });

  const handleItemClick = (item) => {
    if (selectedId === item.id) {
      if (item.type === 'game' || item.gameId) {
        onOpenGame?.(item.gameId || item.id);
      } else {
        onOpenItem?.(item);
      }
    } else {
      setSelectedId(item.id);
    }
  };

  const handleItemDoubleClick = (item) => {
    if (item.type === 'game' || item.gameId) {
      onOpenGame?.(item.gameId || item.id);
    } else {
      onOpenItem?.(item);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'inherit', color: '#1f2937', userSelect: 'none' }}>
      {/* Folder Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #d1d5db',
          paddingBottom: 10,
          marginBottom: 14,
          gap: 12
        }}
      >
        {/* View Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', border: '1px solid #9ca3af' }}>
            <button
              type="button"
              onClick={() => setCurrentView('icon')}
              style={{
                padding: '5px 12px',
                fontSize: 12.5,
                fontWeight: currentView === 'icon' ? 700 : 500,
                backgroundColor: currentView === 'icon' ? '#3b82f6' : '#ffffff',
                color: currentView === 'icon' ? '#ffffff' : '#374151',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              ⊞ Icons
            </button>
            <div style={{ width: 1, backgroundColor: '#d1d5db' }} />
            <button
              type="button"
              onClick={() => setCurrentView('list')}
              style={{
                padding: '5px 12px',
                fontSize: 12.5,
                fontWeight: currentView === 'list' ? 700 : 500,
                backgroundColor: currentView === 'list' ? '#3b82f6' : '#ffffff',
                color: currentView === 'list' ? '#ffffff' : '#374151',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              ☰ List
            </button>
          </div>
          <span style={{ fontSize: 12, color: '#6b7280' }}>
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search folder..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '5px 10px 5px 26px',
              borderRadius: 16,
              border: '1px solid #d1d5db',
              fontSize: 12.5,
              outline: 'none',
              width: 160,
              fontFamily: 'inherit'
            }}
          />
          <span style={{ position: 'absolute', left: 8, top: 5, fontSize: 11, color: '#9ca3af' }}>🔍</span>
        </div>
      </div>

      {/* Main Content Viewport */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        {currentView === 'icon' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
              gap: 16,
              padding: 6
            }}
          >
            {filteredItems.map(item => {
              const isSelected = selectedId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px 6px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.25)' : 'transparent',
                    border: isSelected ? '1px solid #3b82f6' : '1px solid transparent',
                    transition: 'background-color 0.1s ease',
                    textAlign: 'center'
                  }}
                >
                  {/* Thumbnail / Icon */}
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                      position: 'relative'
                    }}
                  >
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: 6,
                          boxShadow: '0 2px 5px rgba(0,0,0,0.25)',
                          border: '1px solid rgba(0,0,0,0.1)'
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: 44, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}>
                        {item.icon || '📁'}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: '#1f2937',
                      lineHeight: 1.3,
                      wordBreak: 'break-word',
                      maxWidth: 104,
                      marginBottom: 4
                    }}
                  >
                    {item.name}
                  </span>

                  {(item.type === 'game' || item.gameId) && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenGame?.(item.gameId || item.id);
                      }}
                      className="aqua-btn primary"
                      style={{ fontSize: 10.5, padding: '2px 8px', borderRadius: 10, marginTop: 2, cursor: 'pointer' }}
                    >
                      Play ▶
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* List View Table */
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #d1d5db', color: '#6b7280', textTransform: 'uppercase', fontSize: 11.5 }}>
                <th style={{ padding: '6px 12px' }}>Name</th>
                <th style={{ padding: '6px 12px' }}>Kind</th>
                <th style={{ padding: '6px 12px' }}>Size</th>
                <th style={{ padding: '6px 12px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => {
                const isSelected = selectedId === item.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    onDoubleClick={() => handleItemDoubleClick(item)}
                    style={{
                      cursor: 'pointer',
                      borderBottom: '1px solid #f3f4f6',
                      backgroundColor: isSelected ? '#3b82f6' : 'transparent',
                      color: isSelected ? '#ffffff' : '#1f2937'
                    }}
                  >
                    <td style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{item.icon || '📄'}</span>
                      <span style={{ fontWeight: 600 }}>{item.name}</span>
                    </td>
                    <td style={{ padding: '8px 12px', color: isSelected ? '#dbeafe' : '#6b7280' }}>
                      {item.kind || 'Document'}
                    </td>
                    <td style={{ padding: '8px 12px', color: isSelected ? '#dbeafe' : '#6b7280' }}>
                      {item.size || '—'}
                    </td>
                    <td style={{ padding: '8px 12px', color: isSelected ? '#dbeafe' : '#6b7280' }}>
                      {item.date || 'Today'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer Info */}
      <div
        style={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: 8,
          marginTop: 'auto',
          fontSize: 11.5,
          color: '#9ca3af',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <span>Double-click any item to open</span>
        <span>Mac OS X Finder Volume</span>
      </div>
    </div>
  );
}
