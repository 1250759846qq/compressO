import { Divider } from '@heroui/react'

import Icon from '@/components/Icon'
import Title from '@/components/Title'
import Link from '@/tauri/components/Link'

export default function Credits() {
  return (
    <div className="w-full py-10 pb-4 px-6">
      <section className="mb-4">
        <Title
          title="致谢"
          iconProps={{ name: 'lowResHeart' }}
          className="mb-6"
        />
        <p className="text-gray-600 dark:text-gray-400 text-[12px] text-center mt-1">
          没有这些出色的开源工具和库，就没有 CompressO：
        </p>
      </section>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="video" size={20} />
            <h3 className="font-bold text-sm">FFmpeg & FFprobe</h3>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            Copyright © 2000-2024 Fabrice Bellard, et al.
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            采用 GPL v2+ 和 LGPL v2.1+ 许可证
          </p>
          <div className="flex gap-2">
            <Link
              href="https://ffmpeg.org/"
              className="text-xs text-primary hover:underline"
            >
              官网
            </Link>
            <Divider orientation="vertical" className="mx-1 h-4" />
            <Link
              href="https://github.com/FFmpeg/FFmpeg"
              className="text-xs text-primary hover:underline"
            >
              GitHub
            </Link>
          </div>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="image" size={20} />
            <h3 className="font-bold text-sm">pngquant</h3>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            Copyright © 2009-2024 Kornel Lesiński
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            采用 GPL v3+ 许可证
          </p>
          <div className="flex gap-2">
            <Link
              href="https://pngquant.org/"
              className="text-xs text-primary hover:underline"
            >
              官网
            </Link>
            <Divider orientation="vertical" className="mx-1 h-4" />
            <Link
              href="https://github.com/kornelski/pngquant"
              className="text-xs text-primary hover:underline"
            >
              GitHub
            </Link>
          </div>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="image" size={20} />
            <h3 className="font-bold text-sm">jpegoptim</h3>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            Copyright © 1996-2024 Timo Kokkonen
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            采用 GPL v3+ 许可证
          </p>
          <div className="flex gap-2">
            <Link
              href="https://github.com/tjko/jpegoptim"
              className="text-xs text-primary hover:underline"
            >
              GitHub
            </Link>
          </div>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="image" size={20} />
            <h3 className="font-bold text-sm">gifski</h3>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            Copyright © 2019-2024 ImageOptim LLC, Kornel Lesiński
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            采用 AGPL v3+ 许可证
          </p>
          <div className="flex gap-2">
            <Link
              href="https://gif.ski/"
              className="text-xs text-primary hover:underline"
            >
              官网
            </Link>
            <Divider orientation="vertical" className="mx-1 h-4" />
            <Link
              href="https://github.com/ImageOptim/gifski/"
              className="text-xs text-primary hover:underline"
            >
              GitHub
            </Link>
          </div>
        </div>

        <div className="text-center pt-2 col-span-full">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            完整的第三方声明与许可证可在{' '}
            <Link href="https://github.com/1250759846qq/compressO-zh-CN/blob/main/THIRD_PARTY_NOTICES.md">
              这里
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
