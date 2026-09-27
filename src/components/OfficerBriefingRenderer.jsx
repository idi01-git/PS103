import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

// Helper to render bolding, numbers, badges, and inline styling
function formatInlineText(text) {
  if (!text) return null;

  // Split by bold (**...**)
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      
      // Check if this bold text is an executive tag like [FINANCIAL HEALTH]
      if (/^\[.*?\]$/.test(inner.trim())) {
        const tag = inner.trim().slice(1, -1);
        let badgeColor = 'bg-slate-100 text-slate-800 border-slate-200';
        if (/health|safe|low/i.test(tag)) badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        if (/bottleneck|warning|delay/i.test(tag)) badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
        if (/action|critical|risk|overrun/i.test(tag)) badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
        return (
          <span key={idx} className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${badgeColor} ml-1 mr-1`}>
            {tag}
          </span>
        );
      }

      return (
        <strong key={idx} className="font-semibold text-[#0f172a]">
          {inner}
        </strong>
      );
    }

    // Check for inline bracketed tags outside bold
    const tagMatches = part.split(/(\[[A-Z\s\-_]{3,25}\])/g);
    if (tagMatches.length > 1) {
      return tagMatches.map((sub, sIdx) => {
        if (/^\[[A-Z\s\-_]{3,25}\]$/.test(sub)) {
          const tag = sub.slice(1, -1);
          return (
            <span key={sIdx} className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200 mx-1">
              {tag}
            </span>
          );
        }
        return <span key={sIdx}>{sub}</span>;
      });
    }

    return <span key={idx}>{part}</span>;
  });
}

// Parses raw markdown into structured blocks (tables, headings, lists, callouts, paragraphs)
function parseMarkdownToBlocks(text) {
  if (!text) return [];
  const lines = text.split(/\r?\n/);
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // 1. Horizontal Divider
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      blocks.push({ type: 'divider' });
      i++;
      continue;
    }

    // 2. Markdown Table Detection (starts with | and has at least two columns)
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.includes('|', 1)) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        // First line is header
        const headerRow = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map(c => c.trim());
        
        // Skip separator row if present (e.g. |---|---|)
        let startIndex = 1;
        if (tableLines[1].includes('---')) {
          startIndex = 2;
        }

        const bodyRows = tableLines.slice(startIndex).map(tl => 
          tl.split('|').slice(1, -1).map(c => c.trim())
        );

        blocks.push({
          type: 'table',
          headers: headerRow,
          rows: bodyRows
        });
        continue;
      }
    }

    // 3. Headings
    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', text: trimmed.slice(4) });
      i++;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', text: trimmed.slice(3) });
      i++;
      continue;
    }
    if (trimmed.startsWith('# ')) {
      blocks.push({ type: 'h1', text: trimmed.slice(2) });
      i++;
      continue;
    }

    // 4. Blockquotes / Alerts
    if (trimmed.startsWith('> ')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ type: 'quote', text: quoteLines.join(' ') });
      continue;
    }

    // 5. Numbered Action Items (e.g. "1. " or "1. 7-Day Data Closure...")
    const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numberMatch) {
      blocks.push({
        type: 'numbered',
        number: numberMatch[1],
        text: numberMatch[2]
      });
      i++;
      continue;
    }

    // 6. Bullet points (- or *)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const bulletText = trimmed.replace(/^[-*]\s+/, '');
      blocks.push({
        type: 'bullet',
        text: bulletText
      });
      i++;
      continue;
    }

    // 7. Regular paragraph
    blocks.push({
      type: 'paragraph',
      text: trimmed
    });
    i++;
  }

  return blocks;
}

export default function OfficerBriefingRenderer({ content, isAssistant = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const blocks = parseMarkdownToBlocks(content);

  return (
    <div className="relative text-xs leading-relaxed font-sans select-text">
      {/* Top Header with Action Bar for Assistant Briefing */}
      {isAssistant && (
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#e9eef5] text-[11px] text-[#64748b]">
          <div className="flex items-center gap-1.5 font-medium text-[#1e293b]">
            <Sparkles className="w-3.5 h-3.5 text-[#0070f3]" />
            <span className="font-semibold text-xs text-[#0f172a]">PAIMANA Officer Briefing</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
              OFFICER-READY
            </span>
          </div>

          <button
            onClick={handleCopy}
            type="button"
            title="Copy entire briefing to clipboard"
            className="flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#475569] hover:text-[#0f172a] border border-[#e2e8f0] transition-all text-[11px]"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-[#64748b]" />
                <span>Copy Briefing</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Render Parsed Blocks */}
      <div className="space-y-2">
        {blocks.map((block, idx) => {
          switch (block.type) {
            case 'divider':
              return <hr key={idx} className="border-t border-[#e2e8f0] my-3.5" />;

            case 'h1':
              return (
                <div key={idx} className="pt-2 pb-1 border-b border-[#e2e8f0] mb-2.5">
                  <h2 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                    {formatInlineText(block.text)}
                  </h2>
                </div>
              );

            case 'h2':
              return (
                <div key={idx} className="flex items-center gap-2 pt-3 pb-1 border-b border-[#f1f5f9] mt-3.5 first:mt-0 mb-1.5">
                  <span className="w-1.5 h-4 bg-[#0070f3] rounded-full shrink-0"></span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0f172a] uppercase tracking-wide">
                    {formatInlineText(block.text)}
                  </h3>
                </div>
              );

            case 'h3':
              return (
                <h4 key={idx} className="text-xs font-semibold text-[#1e293b] mt-2 mb-1">
                  {formatInlineText(block.text)}
                </h4>
              );

            case 'table':
              return (
                <div key={idx} className="overflow-x-auto my-3 rounded-[6px] border border-[#e2e8f0] bg-white shadow-2xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                        {block.headers.map((h, hIdx) => (
                          <th key={hIdx} className="px-3 py-2 text-[11px] font-semibold text-[#1e293b] whitespace-nowrap">
                            {formatInlineText(h)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                      {block.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-3 py-2 text-xs text-[#334155] align-top">
                              {formatInlineText(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );

            case 'numbered':
              return (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-[6px] bg-[#f8fafc] border border-[#e2e8f0] text-xs my-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#1e293b] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {block.number}
                  </span>
                  <div className="flex-1 text-[#1e293b] leading-relaxed">
                    {formatInlineText(block.text)}
                  </div>
                </div>
              );

            case 'bullet':
              return (
                <div key={idx} className="flex items-start gap-2 my-1 text-xs text-[#334155] leading-relaxed pl-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0070f3] mt-1.5 shrink-0" />
                  <div className="flex-1">{formatInlineText(block.text)}</div>
                </div>
              );

            case 'quote':
              return (
                <div key={idx} className="p-3 my-2 rounded-[6px] bg-amber-50/80 border-l-3 border-amber-500 text-amber-900 text-xs">
                  {formatInlineText(block.text)}
                </div>
              );

            case 'paragraph':
            default:
              return (
                <p key={idx} className="text-xs text-[#334155] my-1 leading-relaxed">
                  {formatInlineText(block.text)}
                </p>
              );
          }
        })}
      </div>
    </div>
  );
}
