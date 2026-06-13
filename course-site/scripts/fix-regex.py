"""Fix esbuild regex in standalone HTML."""
import sys
path = sys.argv[1]
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()
old = '[!#</body>-;=?-Z_a-z~]'
new = '[!#<>;=?@A-Z_a-z~\\[\\]\\\\^-]'
c = c.replace(old, new)
with open(path, 'w', encoding='utf-8') as f:
    f.write(c)
print(f'Fixed: {path}')
