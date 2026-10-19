'use client'

import { useState } from 'react'
import { isSupabaseConfigured } from '@/lib/env'

interface UploadFormProps {
  eventName: string
}

interface Selected {
  name: string
  url: string
}

/**
 * Guest photo upload UI. Builds the full interaction (display name, file
 * picker, preview thumbnails, selected list) but NEVER fakes an upload: the
 * submit button is disabled with a clear note while storage is not configured.
 *
 * TODO (Phase 3): wire the upload button to Supabase Storage with quotas and
 * moderation. Only report success when the server confirms the upload.
 */
export function UploadForm({ eventName }: UploadFormProps) {
  const [displayName, setDisplayName] = useState('')
  const [files, setFiles] = useState<Selected[]>([])

  const handleFiles = (list: FileList | null) => {
    if (!list) return
    const next = Array.from(list)
      .filter((f) => f.type.startsWith('image/') || f.type.startsWith('video/'))
      .map((f) => ({ name: f.name, url: URL.createObjectURL(f) }))
    setFiles((prev) => [...prev, ...next])
  }

  const removeAt = (index: number) => {
    setFiles((prev) => {
      const target = prev[index]
      if (target) URL.revokeObjectURL(target.url)
      return prev.filter((_, i) => i !== index)
    })
  }

  const inputClass =
    'mt-1 w-full rounded-md border border-gold/25 bg-black/20 px-4 py-2.5 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold/60 focus:outline-none'
  const labelClass = 'font-body text-sm text-ivory/85'

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => e.preventDefault()}
      aria-describedby={!isSupabaseConfigured ? 'upload-disabled-note' : undefined}
    >
      <div>
        <label htmlFor="upload-name" className={labelClass}>
          Your display name
        </label>
        <input
          id="upload-name"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className={inputClass}
          placeholder="So the couple knows who shared these"
        />
      </div>

      <div>
        <label htmlFor="upload-files" className={labelClass}>
          Photos &amp; videos for {eventName}
        </label>
        <input
          id="upload-files"
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="mt-1 block w-full font-body text-sm text-ivory/70 file:mr-4 file:rounded-full file:border file:border-gold/50 file:bg-transparent file:px-5 file:py-2 file:font-body file:text-xs file:uppercase file:tracking-[0.15em] file:text-gold-light hover:file:bg-gold/10"
        />
      </div>

      {files.length > 0 && (
        <div>
          <p className={labelClass}>Selected ({files.length})</p>
          <ul className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {files.map((file, i) => (
              <li key={`${file.name}-${i}`} className="relative overflow-hidden rounded-lg border border-gold/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={file.url} alt={file.name} className="aspect-square w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  aria-label={`Remove ${file.name}`}
                  className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-ivory transition hover:bg-black/80"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isSupabaseConfigured && (
        <p id="upload-disabled-note" className="rounded-md border border-gold/25 bg-gold/5 px-4 py-3 font-body text-xs text-gold-light/90">
          Uploads open soon. You can select and preview files now, but sharing is not available yet.
        </p>
      )}

      <button
        type="submit"
        disabled={!isSupabaseConfigured}
        className="w-full rounded-full border border-gold bg-rose-deep px-8 py-3 font-body text-sm uppercase tracking-[0.2em] text-ivory shadow-gold transition hover:bg-rose disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline"
      >
        {isSupabaseConfigured ? 'Upload photos' : 'Uploads open soon'}
      </button>
    </form>
  )
}
