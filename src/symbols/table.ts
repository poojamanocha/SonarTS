/*
 * SonarTS
 * Copyright (C) 2017-2017 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as ts from "typescript";

export class SymbolTable {
  private usages = new Map<ts.Node, Usage>();

  public registerUsage(symbol: ts.Symbol, node: ts.Node, flags: UsageFlag): boolean {
    if (this.usages.has(node)) return false;
    this.usages.set(node, new Usage(symbol, flags));
    return true;
  }

  public getUsage(node: ts.Node): Usage | undefined {
    return this.usages.get(node);
  }
}

export class Usage {
  public dead = false;

  constructor(public readonly symbol: ts.Symbol, public readonly flags: UsageFlag) {}

  public is(requestedFlags: UsageFlag) {
    return (this.flags & requestedFlags) > 0;
  }
}

export enum UsageFlag {
  DECLARATION = 1,
  WRITE = 2,
  READ = 4
}