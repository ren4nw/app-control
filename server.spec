# -*- mode: python ; coding: utf-8 -*-


block_cipher = None


a = Analysis(['server.py'],
             pathex=['/home/renan-schaffen/apps/personal/control/production'],
             binaries=[],
             datas=[('app/index.html', 'app/index.html'), ('app/static/*', 'app/static')],
             hiddenimports=['engineio.async_drivers.aiohttp', 'engineio.async_aiohttp'],
             hookspath=[],
             hooksconfig={},
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)

exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,  
          [],
          name='server',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          upx_exclude=[],
          runtime_tmpdir=None,
          console=True,
          disable_windowed_traceback=False,
          target_arch=None,
          codesign_identity=None,
          entitlements_file=None )
