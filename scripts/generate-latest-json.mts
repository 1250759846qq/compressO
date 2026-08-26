#!/usr/bin/env node
/** biome-ignore-all lint/suspicious/noConsole: <> */

/**
 * Generate latest.json for Tauri updater
 *
 * This script generates a latest.json file that contains the latest release information
 * for the Tauri updater plugin to check for updates.
 *
 * Usage: node scripts/generate-latest-json.mjs
 *
 * Output: Creates a latest.json file in the root directory
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
interface Config {
  author: string
  repo: string
  appName: string
}

const CONFIG: Config = {
  author: '1250759846qq',
  repo: 'compressO-zh-CN',
  appName: 'CompressO',
}

// Types
interface PlatformInfo {
  signature: string | null
  url: string
}

interface Platforms {
  [key: string]: PlatformInfo
}

interface LatestJson {
  version: string
  notes: string
  pub_date: string
  platforms: Platforms
}

const releaseTag = process.env.RELEASE_TAG ?? `v${getVersion()}`

/**
 * Get the latest version from package.json
 */
function getVersion(): string {
  const packageJsonPath = path.join(__dirname, '..', 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  return packageJson.version
}

/**
 * Get changelog for the specified version from CHANGELOG.md
 */
function getChangelog(version: string): string {
  const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md')

  if (!fs.existsSync(changelogPath)) {
    console.warn('Warning: CHANGELOG.md not found')
    return 'No changelog available'
  }

  const content = fs.readFileSync(changelogPath, 'utf-8')
  const lines = content.split('\n')

  const versionLineIndex = lines.findIndex((line) =>
    line.trim().startsWith(`### ${version}`),
  )

  if (versionLineIndex === -1) {
    console.warn(`Warning: Version ${version} not found in CHANGELOG.md`)
    return 'No changelog available'
  }

  const changelogLines: string[] = []

  for (let i = versionLineIndex + 1; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('###') && !line.startsWith('####')) {
      break
    }

    changelogLines.push(line)
  }

  while (changelogLines.length > 0 && changelogLines[0]!.trim() === '') {
    changelogLines.shift()
  }
  while (
    changelogLines.length > 0 &&
    changelogLines[changelogLines.length - 1]!.trim() === ''
  ) {
    changelogLines.pop()
  }

  return changelogLines.join('\n').trim()
}

/**
 * Get current UTC time in ISO 8601 format
 */
function getCurrentUTCTime(): string {
  return new Date().toISOString()
}

/**
 * Read signature file content
 */
function readSignature(filePath: string): string | null {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')
      return content.trim()
    }
    console.warn(`Warning: Signature file not found at ${filePath}`)
    return null
  } catch (error) {
    console.error('Error reading signature file:', error)
    return null
  }
}

/**
 * Generate platform-specific URLs
 */
function generatePlatformUrls(version: string): Platforms {
  const baseUrl = `https://github.com/${CONFIG.author}/${CONFIG.repo}/releases/download/${releaseTag}`
  const platforms: Platforms = {}

  // macOS - Apple Silicon (aarch64)
  platforms['darwin-aarch64'] = {
    signature: readSignature(
      `./src-tauri/target/aarch64-apple-darwin/release/bundle/macos/${CONFIG.appName}.app.tar.gz.sig`,
    ),
    url: `${baseUrl}/${CONFIG.appName}_${version}_aarch64.app.tar.gz`,
  }

  // macOS - Intel (x64)
  platforms['darwin-x86_64'] = {
    signature: readSignature(
      `./src-tauri/target/x86_64-apple-darwin/release/bundle/macos/${CONFIG.appName}.app.tar.gz.sig`,
    ),
    url: `${baseUrl}/${CONFIG.appName}_${version}_x64.app.tar.gz`,
  }

  // Windows (x64)
  platforms['windows-x86_64'] = {
    signature: readSignature(
      `./src-tauri/target/release/bundle/nsis/${CONFIG.appName}_${version}_x64-setup.exe.sig`,
    ),
    url: `${baseUrl}/${CONFIG.appName}_${version}_x64-setup.exe`,
  }

  // Linux - AppImage (universal)
  const appImageItem: PlatformInfo = {
    signature: readSignature(
      `./src-tauri/target/release/bundle/appimage/${CONFIG.appName}_${version}_amd64.AppImage.sig`,
    ),
    url: `${baseUrl}/${CONFIG.appName}_${version}_amd64.AppImage`,
  }
  platforms['linux-x86_64'] = appImageItem
  platforms['linux-x86_64-appimage'] = appImageItem

  // Linux - x86_64 (deb)
  platforms['linux-x86_64-deb'] = {
    signature: readSignature(
      `./src-tauri/target/release/bundle/deb/${CONFIG.appName}_${version}_amd64.deb.sig`,
    ),
    url: `${baseUrl}/${CONFIG.appName}_${version}_amd64.deb`,
  }

  return platforms
}

/**
 * Generate the latest.json content
 */
function generateLatestJson(
  version: string,
  changelog: string,
  pubDate: string,
): LatestJson {
  const platforms = generatePlatformUrls(version)

  return {
    version,
    notes: changelog,
    pub_date: pubDate,
    platforms,
  }
}

/**
 * Write JSON to file with proper formatting
 */
function writeJsonFile(filePath: string, data: LatestJson): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

/**
 * Main function
 */
function main(): void {
  console.log('> Generating `latest.json` for Tauri updater\n')

  const version = getVersion()
  console.log(`> Version: ${version}`)

  const changelog = getChangelog(version)
  console.log('> Changelog extracted')

  const pubDate = getCurrentUTCTime()
  console.log(`> Published date: ${pubDate}`)

  const latestJson = generateLatestJson(version, changelog, pubDate)
  console.log('> JSON generated')

  const outputPath = path.join(__dirname, '..', 'latest.json')
  writeJsonFile(outputPath, latestJson)

  console.log(
    '\n> Done! You can now upload `latest.json` to your GitHub release.\n',
  )
}

main()
