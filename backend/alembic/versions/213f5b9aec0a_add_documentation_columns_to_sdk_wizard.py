"""add_documentation_columns_to_sdk_wizard

Revision ID: 213f5b9aec0a
Revises: 3c4c3e11b4b8
Create Date: 2024-04-19 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = '213f5b9aec0a'
down_revision: Union[str, None] = '3c4c3e11b4b8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add documentation_links column
    op.add_column('sdk_wizard_data', sa.Column('documentation_links', sa.JSON(), nullable=True))
    
    # Add documentation_files column
    op.add_column('sdk_wizard_data', sa.Column('documentation_files', sa.JSON(), nullable=True))


def downgrade() -> None:
    # Remove documentation_links column
    op.drop_column('sdk_wizard_data', 'documentation_links')
    
    # Remove documentation_files column
    op.drop_column('sdk_wizard_data', 'documentation_files')
